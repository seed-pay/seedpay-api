-- Custom SQL migration file, put your code below! --
CREATE VIEW total AS
SELECT
  chainId,
  token,
  recipient,
  SUM(recipientAmount::numeric)::text AS total
FROM transactions
GROUP BY
  chain,
  token,
  recipient;