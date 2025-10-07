from flask import Flask
from flask_cors import CORS

# blueprints
from routes.transaction_routes import transaction_bp
from routes.report_routes import report_bp
from routes.budget_routes import budget_bp

app = Flask(__name__)
CORS(app)  # allow frontend requests

# ✅ register blueprints with clear prefixes
app.register_blueprint(transaction_bp, url_prefix="/api/transactions")
app.register_blueprint(budget_bp, url_prefix="/api/budgets")
app.register_blueprint(report_bp, url_prefix="/api/reports")

@app.route("/")
def home():
    return {"message": "✅ Personal Finance Tracker API is running!"}

if __name__ == "__main__":
    app.run(debug=True)
