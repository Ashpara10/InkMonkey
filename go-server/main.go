package main

import "log"

func main() {
	store, err := NewMySqlStorage()
	if err != nil {
		log.Fatal(err)
	}
	if err := store.Init(); err != nil {
		log.Fatal(err)

	}
	server := Server("localhost:8000", store)
	server.Start()
}
