import base64, glob, json, sys

name = sys.argv[1]
f = sorted(glob.glob("/Users/nurlyhantaubuzar/.cursor/browser-logs/cdp-response-Page.captureScreenshot-*.json"))[-1]
d = json.load(open(f))
data = d.get("data") or d.get("result", {}).get("data")
open(f"/Users/nurlyhantaubuzar/Desktop/termmobalance_project/.qa/shots/{name}.jpg", "wb").write(base64.b64decode(data))
print(name)
