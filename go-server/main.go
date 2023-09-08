package main

import (
	"log"

	"github.com/Ashpara10/server/server"
	"github.com/Ashpara10/server/storage"
)

func main() {
	store, err := storage.NewMySqlStorage()
	if err != nil {
		log.Fatal(err)
	}
	if err := store.Init(); err != nil {
		log.Fatal(err)

	}
	server := server.Server("localhost:8000", store)
	server.Start()
}
