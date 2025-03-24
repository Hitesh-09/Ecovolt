print("Starting Flask app...")  # Add this at the top
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def battery_optimization_knapsack(apps, battery_capacity):
    """
    Selects apps that maximize the total importance score while staying within battery limits.

    :param apps: List of dictionaries with 'battery' and 'importance' keys
    :param battery_capacity: Maximum battery available for allocation
    :return: List of selected apps
    """
    # Sort apps based on importance-to-battery ratio (descending)
    apps.sort(key=lambda x: x['importance'] / x['battery'], reverse=True)

    total_battery_used = 0
    selected_apps = []

    for app in apps:
        if total_battery_used + app['battery'] <= battery_capacity:
            selected_apps.append(app)
            total_battery_used += app['battery']

    return selected_apps


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/optimize", methods=["POST"])
def optimize():
    data = request.json
    apps = data.get("apps", [])
    battery_capacity = data.get("battery_capacity", 0)

    selected_apps = battery_optimization_knapsack(apps, battery_capacity)
    
    return jsonify({"selected_apps": selected_apps})


if __name__ == "__main__":
    app.run(debug=True)
