import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// const types = [user, common, order, nft, discount];

const typesArray = loadFilesSync(path.join(__dirname, "."), {
  extensions: ["graphql"],
});

export default mergeTypeDefs(typesArray);
