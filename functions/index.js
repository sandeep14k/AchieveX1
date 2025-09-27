const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const crypto = require("crypto");

admin.initializeApp();

// IMPORTANT: Set your PayU credentials in your Firebase environment
// In your terminal, run:
// firebase functions:config:set payu.key="YOUR_MERCHANT_KEY"
// firebase functions:config:set payu.salt="YOUR_MERCHANT_SALT"

const PAYU_KEY = functions.config().payu.key;
const PAYU_SALT = functions.config().payu.salt;

exports.generatePayuHash = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (request.method !== "POST") {
      return response.status(405).send("Method Not Allowed");
    }

    try {
      const { amount, productinfo, firstname, email } = request.body;

      if (!amount || !productinfo || !firstname || !email) {
        return response.status(400).json({ success: false, error: "Missing required fields." });
      }

      // Generate a unique transaction ID
      const txnid = `txn_${crypto.randomBytes(8).toString("hex")}`;
      
      // The hash string sequence is critical and must be in this exact order
      const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`;
      
      const hash = crypto.createHash("sha512").update(hashString).digest("hex");
      
      console.log("Generated PayU Hash for txnid:", txnid);
      return response.status(200).json({ success: true, hash, txnid });

    } catch (error) {
      console.error("Error generating PayU hash:", error);
      return response.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });
});