import { buildWebpack } from "./config/build/buildWebpack";
import webpack from "webpack";

interface EnvVariables {
	mode: "production" | "development";
}

module.exports = (env: EnvVariables) => {
	const config: webpack.Configuration = buildWebpack({
		mode: env.mode ?? "development",
	});

	return config;
};
