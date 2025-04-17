import User from "./User";
import Token from "./Token";

User.hasMany(Token, { foreignKey: "userId", onDelete: "CASCADE" });
Token.belongsTo(User, { foreignKey: "u_id" });


export { User, Token};
