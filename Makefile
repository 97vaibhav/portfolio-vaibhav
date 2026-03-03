.PHONY: install dev build lint deploy help

# Default target
.DEFAULT_GOAL := help

install: ## Install project dependencies
	npm install

dev: ## Start the local Vite development server
	npm run dev

build: ## Build the React application for production
	npm run build

lint: ## Run ESLint to check for code issues
	npm run lint

deploy: ## Deploy the portfolio to Netlify Production
	npx netlify-cli deploy --prod

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
