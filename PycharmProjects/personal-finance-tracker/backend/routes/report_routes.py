from flask import Blueprint, jsonify
from models.transaction_model import get_transactions

report_bp = Blueprint("reports", __name__)

@report_bp.route("/summary", methods=["GET"])
def summary():
    transactions = get_transactions()
    total_income = sum(t["amount"] for t in transactions if t["type"] == "income")
    total_expense = sum(t["amount"] for t in transactions if t["type"] == "expense")
    balance = total_income - total_expense
    return jsonify({
        "income": total_income,
        "expense": total_expense,
        "balance": balance
    })
