import pandas as pd
from services.category_service import categorize

def parse_file(file):
    try:
        df = pd.read_csv(file)
    except Exception:
        file.seek(0)
        df = pd.read_excel(file)

    transactions = []
    for _, row in df.iterrows():
        desc = str(row.get("Description", ""))
        amt = float(row.get("Amount", 0))
        t_type = "income" if amt > 0 else "expense"

        transactions.append({
            "date": str(row.get("Date")),
            "amount": abs(amt),
            "type": t_type,
            "description": desc,
            "category": categorize(desc)
        })
    return transactions
