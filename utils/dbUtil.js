import moment from 'moment';

/**
 * Get the total amount sent today by a specific sending_account
 * @param {string} sendingAccount - the sending account ID to query
 * @param {object} db - MySQL connection (fixture or created)
 * @returns {number} - total amount sent today, 0 if no records or error
 */
export async function getTodaySentAmountBySenderId(sendingAccount, db) {
  try {
    // Format today as YYYY-MM-DD using moment
    const today = moment().format('YYYY-MM-DD');

    const [rows] = await db.execute(
      `SELECT SUM(amount) AS total_amount
       FROM transfer_history
       WHERE sending_account = ?
         AND DATE(created_at) = ?`,
      [sendingAccount, today]
    );

    const totalAmount = rows[0].total_amount || 0;

    console.log(`📊 Sending account ${sendingAccount} has sent ${totalAmount} today (${today})`);

    return totalAmount;

  } catch (err) {
    console.error('DB Error:', err);
    return 0;
  }
}

/**
 * Get the first transaction record by transfer_ref_id
 * @param {string} transactionId - transfer_ref_id to search
 * @param {object} db - MySQL connection (fixture or created)
 * @returns {object|null} - first row object or null if not found
 */
export async function getTransactionRecordById(db, transactionId) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM transfer_history WHERE transfer_ref_id = ?',
      [transactionId]
    );

    if (rows.length > 0) {
      console.log(`✅ DB Record found for transaction ID: ${transactionId}`);
      return rows[0];
    } else {
      console.log(`❌ No DB record found for transaction ID: ${transactionId}`);
      return null;
    }
  } catch (err) {
    console.error('DB Error:', err);
    return null;
  }
}
