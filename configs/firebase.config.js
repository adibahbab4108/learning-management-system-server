import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "learning-management-syst-430aa",
  private_key_id: "144a7d86e490158d53720d166558de35fd3e4cbd",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDMIh7i2FAPmQvX\nL8STzttumTpB3R/y7g2nbaQdtj5kxeWivREcB6ALcJmfcQUdO4dyaPo0/KTsrdmY\nOl4PNJQoMwiQA3T9IksEtCCZYNGFh5IjKi7Ubs/fXt0CAd/wXCzp/nYkKg1hANZd\nmIQm4pZmfKWvvsShwB4MkJmE2xRk+9gYuxN60e88ZUKcU5S6bKRfO7AbxAzq12EY\n8wepE2gFKABhWzRAWuEOHvQridh/8SaJAB30qzBO3bDc2aT5m4+hZ9K/IUzafJ7s\nq324dN8j/4byUPvEc8r0JR7IijKr32wTsN7vFJhtC3GpYCwXqNGIiaYIl5uiN1Xe\nVAvfxAO5AgMBAAECgf9DXVqmQbMqBNw6UFbu8DTMKs34CcWhV+TFDjdfO1LSrrLw\nRiI2K4Tg09658YSDHIstKLeN4FIM22SlwQr3AsL0Jb6yNZZqcuIhHYdJFm7p1Dyh\nMHOoZyAW9rvdDbgv+fIPWIobJSDy3YYpr0s2UwchZpx9y/tFnJxOAA6pjdmfZtOE\n5dikjyLrRNY5OgakUsu9Mtlw1iTIVWS2j0Ymfc+Cj638q9a9EBb7DRulGEH6sZwF\n33gMZP30gYfplTR1HDnZxBGtlbDBcsy/eSBAuSE8BamKSfVCVMKxGe+CuA3JZxUS\ny+ZThwCdmhxR38gCnAiX+KW01/QbPXVoCOvGKdECgYEA8gDqge3D+CMIzCv/Yt5N\nQd8ATC5CGbHL4bJvzNLXUOOFEucHqNu0M7EiNMBobjMEmmx91SZLw4q6Q1fGjwQo\nlUPWR2L7G4fOtP6aTeqwY0dEuuqMy1x75tR0eBtlqJSx/raBeXMNP046nWfk7ufO\n4kIcodytuOc/J96xQksBbOkCgYEA1/CAFIoKXAdN8XTYHo/Ll8X/felffvS3ohtH\nJrhtO8KgdYeMZuzSfIgC6xZRtPdOANJgOA23xi5BqgwCAoTc29tm0stQhvpGEZf1\n+NhznlnqWVeev98qNYu8Ys5wljG3KH+yUZQPAorGnrTIzHHtY+sgJtwE47GQCPnB\n7/vbXlECgYA4vao+SIc4OM6pQG+iuMiYdzbUpcvtxlgtVO8NsSm214GuCukq2EiK\nDjAc+jgCDog3xNREE7ST5oUBoST3B1yUktE876I8tDztBv0a47nzrRQaV0Antkl+\nt7WPK61MN4D8XcJBvY4Pl8H6gg+VTFifiCy6bsl0nxOZv4cEKh3tcQKBgH1aIz/J\nElJx+xEbnwm+t5UXX0UcYE82iBMWeqtDjEWQqc0QLrTg7R9VZTxK7It8tE9N0IU5\nkWD+ISgxaElGD1+hcYMUe16fkmVMLYGTRSq7T4sljgYb6kjDIUzKQhkuKwDbgAxT\nQpNbNAmVMKtdx0ylhTiJqFz1CoPrWGWTcrjBAoGBAKzJ/Sb3UAyz0TbENHYor+lN\nJ8yAprJFnTc9abGeyAocZo9IDV2DljutbJu6uY47GWdoZSNL08Iqgi277ptPBym6\nnNW4F6WGRoJBzYg8Oea2c4OYS2TmBG8kcOM1L+DdUP0vhg0BwvcjFJm4PrCdBssr\n7CdyB/ulj0NeYnNDBZv+\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@learning-management-syst-430aa.iam.gserviceaccount.com",
  client_id: "100849966824266041096",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40learning-management-syst-430aa.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
