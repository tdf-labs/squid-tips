process: migrate
	@node -r dotenv/config lib/processor.js


build:
	@npm run build


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply


codegen:
	@npx --yes @subsquid/typeorm-codegen

typegen-khala:
	@npx --yes @subsquid/substrate-typegen typegenKhala.json
typegen-kusama:
	@npx --yes @subsquid/substrate-typegen typegenKusama.json
typegen-polkadot:
	@npx --yes @subsquid/substrate-typegen typegenPolkadot.json

typegen: typegen-khala typegen-kusama typegen-polkadot

up:
	@docker-compose up -d

down:
	@docker-compose down

deploy:
    @API_DEBUG=true npx sqd squid update tips-$(network)@$(version) --source github.com/tdf-labs/squid-tips.git#main -v -e NETWORK=$(network)

.PHONY: build serve process migrate codegen typegen up down
