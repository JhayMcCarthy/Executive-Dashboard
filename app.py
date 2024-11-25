from flask import Flask, request, jsonify, render_template, redirect, url_for, session, flash
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Function to establish database connection
def create_connection():
    try:
        connection = mysql.connector.connect(
            host='95.217.63.56',
            database='business_kedebah',
            user='kedebahBusinessUser',
            password='n3wKedebahuSer!',
            port='1632',
        )
        if connection.is_connected():
            print("Connected to MySQL database")
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# Function to establish connection to the authentication database
def auth_db_connection():
    try:
        connection = mysql.connector.connect(
            host='148.251.89.119',
            database='execdb',
            user='exec',
            password='exec$33sUrE',
            port='3306',
        )
        if connection.is_connected():
            print("Connected to Authentication DB")
        return connection
    except Error as e:
        print(f"Error connecting to Auth DB: {e}")
        return None
    
# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        connection = auth_db_connection()
        if connection:
            cursor = connection.cursor(dictionary=True)
            query = "SELECT * FROM users WHERE username = %s AND password = %s"
            cursor.execute(query, (username, password))
            user = cursor.fetchone()
            connection.close()
            
            if user:
                session['user_id'] = user['id']
                session['username'] = user['username']
                flash('Login successful!', 'success')
                return redirect(url_for('finance'))
            else:
                flash('Invalid credentials. Please try again.', 'danger')
    
    return render_template('index.html')


# Logout route
@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))

# Protect routes with a login required decorator
def login_required(func):
    from functools import wraps
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('You need to log in to access this page.', 'warning')
            return redirect(url_for('login'))
        return func(*args, **kwargs)
    return decorated_function



# Home route to render the frontend
@app.route('/finance')
def finance():
    return render_template('finance.html')

# Route for HR Page
@app.route('/hr')
def hr():
    return render_template('hr.html')

# Route for Sign In Page
@app.route('/')
def index():
    return render_template('index.html')

# Route for Operations Page
@app.route('/operations')
def operations():
    return render_template('operations.html')

# Route for Facilities Page
@app.route('/facilities')
def facilities():
    return render_template('facilities.html')

# Route for Engineering Page
@app.route('/engineering')
def engineering():
    return render_template('engineering.html')

# Route for Business Page
@app.route('/business')
def business():
    return render_template('business.html')

@app.route('/forgot-password')
def forgot_password():
    return render_template('forgot_password.html')  # Make sure you have this template file

# Other routes, like register and learn_more, if needed
@app.route('/sign_up')
def sign_up():
    return render_template('signup.html')

@app.route('/learn-more')
def learn_more():
    return render_template('learn_more.html')

@app.route('/usermanagement')
def usermanagement():
    return render_template('usermanagement.html')



###### Finance Page Queries ######
# Endpoint for Gross Profit 
@app.route('/gross_profit_score', methods=['GET'])
def gross_profit_score():
    query = """
    SELECT 
        SUM(revenue.total_revenue) - SUM(cost.total_cost) AS gross_profit
    FROM 
        (SELECT product_id, SUM(price * quantity) AS total_revenue
         FROM sales_order_items GROUP BY product_id) AS revenue
    JOIN 
        (SELECT product_id, SUM(price * quantity) AS total_cost
         FROM procurement_purchased_items GROUP BY product_id) AS cost
    ON revenue.product_id = cost.product_id;
    """
    return execute_query(query)


# Endpoint for Debtors Report
@app.route('/debtors_report', methods=['GET'])
def debtors_report():
    query = """
    SELECT 
        SUM(debtors.total_debt) AS total_debtors,
        (SUM(collections.total_collected) / NULLIF(SUM(debtors.total_debt), 0)) * 100 AS collection_percentage
    FROM 
        (SELECT 
             customer_id, 
             SUM(sub_total) AS total_debt
         FROM 
             invoices
         WHERE 
             status <> 'Paid Invoice'
         GROUP BY 
             customer_id) AS debtors
    LEFT JOIN 
        (SELECT 
             customer_id, 
             SUM(amount_paid) AS total_collected
         FROM 
             payments
         GROUP BY 
             customer_id) AS collections 
    ON debtors.customer_id = collections.customer_id;
    """
    return execute_query(query)


# Opex Ratio Endpoint
@app.route('/opex_ratio', methods=['GET'])
def opex_ratio():
    query = """
    SELECT 
        (SUM(expense_total.total_expenses) / NULLIF(SUM(revenue.total_revenue), 0)) * 100 AS opex_ratio
    FROM 
        (SELECT 
            COALESCE(SUM(amount), 0) AS total_expenses
         FROM 
            expense_payments
         UNION ALL
         SELECT 
            COALESCE(SUM(amount), 0)
         FROM 
            petty_expenses) AS expense_total
    CROSS JOIN 
        (SELECT 
            SUM(price * quantity) AS total_revenue
        FROM 
            sales_order_items) AS revenue;
    """
    return execute_query(query)


# Total Revenue Endpoint
@app.route('/total_revenue', methods=['GET'])
def total_revenue():
    query = """
    SELECT 
        SUM(price * quantity) AS total_revenue
    FROM 
        sales_order_items;
    """
    return execute_query(query)


# Net Profit Endpoint
@app.route('/net_profit_margin', methods=['GET'])
def net_profit_margin():
    query = """
    SELECT 
        ((SUM(revenue.total_revenue) - SUM(expense_total.total_expenses)) / SUM(revenue.total_revenue)) * 100 AS net_profit_margin
    FROM 
        (SELECT 
            COALESCE(SUM(amount), 0) AS total_expenses
         FROM 
            expense_payments
         UNION ALL
         SELECT 
            COALESCE(SUM(amount), 0)
         FROM 
            petty_expenses) AS expense_total
    CROSS JOIN 
        (SELECT 
            SUM(price * quantity) AS total_revenue
        FROM 
            sales_order_items) AS revenue;
    """
    return execute_query(query)


# Endpoint for Operating Profit Margin
@app.route('/operating_profit_margin', methods=['GET'])
def operating_profit_margin():
    query = """
    SELECT 
        (SUM(revenue.total_revenue) - SUM(cost.total_cost) - SUM(operating.total_expense)) 
        / NULLIF(SUM(revenue.total_revenue), 0) * 100 AS operating_profit_margin
    FROM 
        (SELECT product_id, SUM(price * quantity) AS total_revenue
         FROM retail_sales_items GROUP BY product_id) AS revenue
    JOIN 
        (SELECT product_id, SUM(price * quantity) AS total_cost
         FROM procurement_purchase_order_items GROUP BY product_id) AS cost
    ON revenue.product_id = cost.product_id
    CROSS JOIN 
        (SELECT SUM(amount) AS total_expense FROM expense_payments) AS operating;

        
    """
    return execute_query(query)


#Endpoint for Gross Profit Magin
@app.route('/gross_profit_margin', methods=['GET'])
def gross_profit_margin():
    query = """
    SELECT 
        (SUM(revenue.total_revenue) - SUM(cost.total_cost)) / NULLIF(SUM(revenue.total_revenue), 0) * 100 AS gross_profit_margin
    FROM 
        (SELECT 
            product_id, 
            SUM(price * quantity) AS total_revenue
        FROM 
            sales_order_items
        GROUP BY 
            product_id) AS revenue
    JOIN 
        (SELECT 
            product_id, 
            SUM(price * quantity) AS total_cost
        FROM 
            procurement_purchased_items
        GROUP BY 
            product_id) AS cost
    ON 
        revenue.product_id = cost.product_id;

    """
    return execute_query(query)





###### Business Page Queries ######
# Endpoint for customer growth 
@app.route('/customer_growth', methods=['GET'])
def customer_growth():
    # Get start_date and end_date from the query parameters
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    # SQL query with placeholders for start_date and end_date
    query = """
    -- Display customer growth (unique customers per month) over time for three different products within a date range
    SELECT 
        p.name AS product_name,
        DATE_FORMAT(so.created_at, '%Y-%m') AS formatted_year_month,
        COUNT(DISTINCT co.id) AS unique_customers_per_month -- Represents "Customer Growth"
    FROM 
        customers co
    JOIN 
        sales_orders so ON co.id = so.customer_id
    JOIN 
        sales_order_items soi ON so.id = soi.sales_order_id
    JOIN 
        products p ON soi.product_id = p.id
    WHERE 
        so.created_at IS NOT NULL
        AND so.created_at BETWEEN %s AND %s
    GROUP BY 
        p.name, formatted_year_month
    ORDER BY 
        p.name, formatted_year_month;
    """
    
    # Execute the query with parameters to prevent SQL injection
    return execute_query(query, (start_date, end_date))

    


#Endpoint for Target vs Actual
@app.route('/target_vs_actual', methods=['GET'])
def target_vs_actual ():
    query = """

    SELECT 
        p.name AS product_name,
        rt.target_amount AS target_revenue,
        COALESCE(SUM(so.total), 0) + COALESCE(SUM(rs.net_total), 0) + COALESCE(SUM(cs.net_total), 0) AS actual_revenue,
        ROUND((COALESCE(SUM(so.total), 0) + COALESCE(SUM(rs.net_total), 0) + COALESCE(SUM(cs.net_total), 0)) / rt.target_amount * 100, 2) AS revenue_percentage
    FROM 
        revenue_targets rt
    JOIN 
        products p ON rt.targetable_id = p.id
    LEFT JOIN 
        sales_orders so ON so.customer_id = p.id  -- Assuming there's a direct relation based on customer_id
    LEFT JOIN 
        retail_sales rs ON rs.customer_id = p.id  -- Assuming similar relation for retail sales
    LEFT JOIN 
        cash_sales cs ON cs.customer_id = p.id  -- Assuming similar relation for cash sales
    WHERE 
        rt.targetable_type = 'product'  -- Adjust based on your specific structure
    GROUP BY 
        p.name, rt.target_amount;

    """
    return execute_query(query)



# Endpoint for Top customers (product based, usage, cross and upsell)
@app.route('/top_customers', methods=['GET'])
def top_customer ():
    query = """
    SELECT 
        c.id AS customer_id, 
        c.company_name AS customer_name, 
        SUM(soi.quantity * soi.price) AS total_spent, 
        COUNT(DISTINCT so.id) AS purchase_frequency,
        GROUP_CONCAT(DISTINCT p.name ORDER BY p.name ASC) AS products_purchased
    FROM 
        customers c
    JOIN 
        sales_orders so ON c.id = so.customer_id
    JOIN 
        sales_order_items soi ON so.id = soi.sales_order_id
    JOIN 
        products p ON soi.product_id = p.id
    GROUP BY 
        c.id, c.company_name
    ORDER BY 
        total_spent DESC, purchase_frequency DESC
    LIMIT 10;

    """
    return execute_query(query)


# Endpoint for  Opportunity Pipeline (% growth and revenue) 
@app.route('/opportunity_pipeline', methods=['GET'])
def opportunity_pipeline ():
    query = """
    SELECT
        c.id AS customer_id,
        c.company_name,
        SUM(CASE WHEN so.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) THEN so.total ELSE 0 END) AS last_year_revenue,
        SUM(CASE WHEN so.created_at >= DATE_SUB(CURDATE(), INTERVAL 2 YEAR) AND so.created_at < DATE_SUB(CURDATE(), INTERVAL 1 YEAR) THEN so.total ELSE 0 END) AS previous_year_revenue,
        CASE 
            WHEN SUM(CASE WHEN so.created_at >= DATE_SUB(CURDATE(), INTERVAL 2 YEAR) AND so.created_at < DATE_SUB(CURDATE(), INTERVAL 1 YEAR) THEN so.total ELSE 0 END) > 0 
            THEN (
                SUM(CASE WHEN so.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) THEN so.total ELSE 0 END) - 
                SUM(CASE WHEN so.created_at >= DATE_SUB(CURDATE(), INTERVAL 2 YEAR) AND so.created_at < DATE_SUB(CURDATE(), INTERVAL 1 YEAR) THEN so.total ELSE 0 END)
            ) / SUM(CASE WHEN so.created_at >= DATE_SUB(CURDATE(), INTERVAL 2 YEAR) AND so.created_at < DATE_SUB(CURDATE(), INTERVAL 1 YEAR) THEN so.total ELSE 0 END) * 100
            ELSE NULL
        END AS revenue_growth_percentage
    FROM
        customers c
    LEFT JOIN
        sales_orders so ON c.id = so.customer_id
    WHERE
        c.deleted_at IS NULL
    GROUP BY
        c.id, c.company_name
    ORDER BY
        revenue_growth_percentage DESC;

    """
    return execute_query(query)




###### Operations Page Queries ######
# Endpoint for company efficiency score 
@app.route('/company_efficiency_score', methods=['GET'])
def company_efficiency_score ():
    query = """
    SELECT 
    (
        SELECT COUNT(CASE WHEN status <> 'overdue' THEN 1 END) * 1.0 / COUNT(*)
        FROM activities
    ) + 
    (
        SELECT 
            AVG(CASE WHEN status = 'completed' THEN project_progress ELSE NULL END)
        FROM 
            projects
    ) / 2 AS company_efficiency_score;

     """
    return execute_query(query)


@app.route('/nps', methods=['GET'])
def nps ():
    query = """
    SELECT
    (SELECT COUNT(*) FROM app_logs WHERE tags = 'error') AS total_system_errors,
    (SELECT COUNT(*) FROM help_desk WHERE message = 'complaint') AS total_complaints,
    COALESCE(
        (SELECT AVG(TIMESTAMPDIFF(HOUR, help_desk.created_at, help_desk_responses.created_at)) 
         FROM help_desk 
         JOIN help_desk_responses ON help_desk.id = help_desk_responses.help_desk_id 
         WHERE help_desk.message = 'complaint'), 0
    ) AS average_ttr_hours;
     """
    return execute_query(query)




###### Talent and Compliance Page Queries ######
# Endpoint for Average Employee KPI Score 
@app.route('/employee_kpi', methods=['GET'])
def employee_kpi ():
    query = """
    SELECT 
        d.name AS Department,
        AVG(skp.score) AS Average_KPI_Score
    FROM 
        users u
    JOIN 
        staff_key_performances skp ON u.id = skp.staff_id
    JOIN 
        departments d ON u.department = d.id
    GROUP BY 
        d.name
    ORDER BY 
        d.name;
    """
    return execute_query(query)




# Endpoint for Average Employee KPI Score 
@app.route('/attendace_ratio', methods=['GET'])
def attendace_ratio ():
    query = """
    SELECT 
        u.id,
        u.first_name,
        u.last_name,
        (SUM(CASE WHEN sa.signed_out_at IS NOT NULL THEN 1 ELSE 0 END) / (COUNT(DISTINCT sa.id))) * 100 AS reporting_time_ratio,
        (COUNT(DISTINCT sa.id) - SUM(CASE WHEN sa.signed_out_at IS NOT NULL THEN 1 ELSE 0 END)) * 100 / COUNT(DISTINCT sa.id) AS absenteeism_ratio
    FROM 
        staff_attendances sa
    JOIN users u ON sa.admin_id = u.id
    GROUP BY 
        u.id, 
        u.first_name, 
        u.last_name;

    """
    return execute_query(query)



# Endpoint for Employee Growth Curve 
@app.route('/employee_growth_curve', methods=['GET'])
def employee_growth_curve ():
    query = """
    SELECT 
        u.first_name,
        u.last_name,
        ue.emp_type,
        ue.start_date,
        ue.extension_count,
        sp.salary,
        skp.score,
        ue.end_date
    FROM    
        users u
        JOIN user_emp_types ue ON u.id = ue.staff_id
        JOIN staff_key_performances skp ON u.id = skp.staff_id
        JOIN salary_payments sp ON u.id = sp.job_id
    ORDER BY 
        u.id, 
        ue.start_date;
    """
    return execute_query(query)



# Function to execute a query and return the result
def execute_query(query):
    # Create a connection to the database
    connection = create_connection()
    
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500

    try:
        cursor = connection.cursor(dictionary=True, buffered=True)
        cursor.execute(query)
        result = cursor.fetchone()
        #result = cursor.fetchall()  # Use fetchone since we expect only one result
        return jsonify(result)
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()

# Main entry point for running the app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)