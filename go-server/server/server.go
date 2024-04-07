package server

import (
	"fmt"
	"strings"

	"github.com/Ashpara10/server/storage"
	"github.com/Ashpara10/server/types"
	t "github.com/Ashpara10/server/types"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/golang-jwt/jwt/v5"
)

type ApiServer struct {
	port  string
	store *storage.Storage
}

func Server(port string, store *storage.Storage) *ApiServer {

	return &ApiServer{
		port:  port,
		store: store,
	}
}

func (s *ApiServer) Start() {
	app := fiber.New()
	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"msg": "Hello World",
		})
	})

	api := app.Group("/api/v1")

	notes := api.Group("/note/:id")
	notes.Use(func(c *fiber.Ctx) error {
		header := c.GetReqHeaders()["Auth-Token"]
		t, err := types.ValidateJwtAuthToken(header)
		if err != nil {
			return err
		}
		if !t.Valid {
			return c.JSON(&fiber.Map{
				"error": "Invalid Jwt Token",
			})
		}
		id, err := GetIdFromParams(c)
		if err != nil {
			return c.JSON(&fiber.Map{
				"errorIdParams": err,
			})
		}
		user, err := s.store.GetUserById(id)
		fmt.Println("inside note middleware getuserbyid", user)
		if err != nil {
			return c.JSON(&fiber.Map{
				"errorUserById": err,
			})
		}

		claims := t.Claims.(jwt.MapClaims)

		if float64(user.ID) != claims["user"] {
			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"msg": "Access denied:Enter a Valid JWT token",
			})
		}

		// middleware := func(c fiber.Ctx) error {

		// }

		return c.Next()
	})
	notes.Get("/getnotes", func(c *fiber.Ctx) error {
		id := c.Params("id")

		notes, err := s.store.FetchAllNotes(id)
		if err != nil {
			return err
		}
		return c.JSON(&fiber.Map{
			"data": notes,
		})
	})
	notes.Get("/getnote/:noteid", func(c *fiber.Ctx) error {
		id := c.Params("noteid")

		note, err := s.store.GetNoteByID(id)
		if err != nil {
			return err
		}
		return c.JSON(&fiber.Map{
			"data": note,
		})
	})
	notes.Post("/createnote", func(c *fiber.Ctx) error {
		// id := c.Params("id")
		note := new(t.Note)
		err := c.BodyParser(&note)
		if err != nil {
			return err
		}
		fmt.Print(note)
		notes, err := s.store.CreateNote(note)
		if err != nil {
			return err
		}
		return c.JSON(&fiber.Map{
			"data": notes,
		})
	})
	notes.Put("/update/:noteid", func(c *fiber.Ctx) error {
		noteId := c.Params("noteId")
		note := new(t.Note)
		err := c.BodyParser(&note)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"status": false, "err": err.Error()})
		}
		fmt.Print(note)
		updatedNote, err := s.store.UpdateNote(noteId, note)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"status": false, "err": err.Error()})
		}
		return c.JSON(&fiber.Map{
			"data": updatedNote,
		})
	})
	notes.Delete("/delete/:noteid", func(c *fiber.Ctx) error {
		noteId := c.Params("noteId")
		ids := strings.Split(noteId, ",")
		if len(ids) > 0 {
			var notesToDelete []t.NoteParam
			// for i := 0; i < len(ids); i++ {
			// 	append(notesToDelete, t.NoteParam{ID: ids[i]})
			// }

			err := s.store.DeleteNotes(notesToDelete)
			if err != nil {
				return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"status": false, "err": err.Error()})
			}
		}
		fmt.Println(len(ids))

		err := s.store.DeleteNote(noteId)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"status": false, "err": err.Error()})
		}
		return c.JSON(&fiber.Map{
			"status":  true,
			"message": fmt.Sprintf("Note with ID %s Successfully deleted", noteId),
		})
	})

	user := api.Group("/user/:id", func(c *fiber.Ctx) error {
		fmt.Println("Inside middleware")

		token := c.GetReqHeaders()["Auth-Token"]

		t, err := types.ValidateJwtAuthToken(token)
		if err != nil {
			return err
		}
		if !t.Valid {
			return c.JSON(&fiber.Map{
				"error": "Invalid Jwt Token",
			})
		}
		id, err := GetIdFromParams(c)
		if err != nil {
			return c.JSON(&fiber.Map{
				"errorIdParams": err,
			})
		}
		user, err := s.store.GetUserById(id)
		fmt.Println("inside user middleware getuserbyid", user)
		if err != nil {
			return c.JSON(&fiber.Map{
				"errorUserById": err,
			})
		}

		claims := t.Claims.(jwt.MapClaims)
		if user.ID != claims["user"] {
			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"msg": "Access denied:Enter a Valid JWT token",
			})
		}

		return c.Next()
	})
	api.Post("/signup", func(c *fiber.Ctx) error {
		u := new(t.User)
		err := c.BodyParser(u)
		if err != nil {
			return err
		}
		user, err := s.store.CreateUser(u)
		if err != nil {
			return err
		}
		fmt.Println("signup handler ", user)
		token, err := t.CreateJwtAuthToken(user.ID)
		if err != nil {
			return err
		}

		return c.JSON(&t.UserResponse{
			Token: token,
			User:  user,
		})
	})

	app.Post("/login", func(ctx *fiber.Ctx) error {
		user := new(t.User)
		if err := ctx.BodyParser(&user); err != nil {
			return err
		}
		u, err := s.store.GetUserByEmail(user.Email)
		if err != nil {
			return ctx.JSON(map[string]string{
				"msg":   "User not found",
				"error": string(err.Error()),
			})

		}

		if user.Password != u.Password {
			return ctx.JSON(map[string]string{

				"error": "Invalid Credentials:Login using correct password",
			})

		}
		token, err := t.CreateJwtAuthToken(u.ID)
		if err != nil {
			return err
		}
		return ctx.JSON(&t.UserResponse{
			Token: token,
			User:  u,
		})
	})

	app.Get("/user/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		fmt.Println(id)
		user, err := s.store.GetUserById(id)
		if err != nil {
			return err
		}

		return c.JSON(&fiber.Map{
			"user": user,
		})
	})

	user.Delete("/delete", func(c *fiber.Ctx) error {
		fmt.Println("Inside user delete")
		id := c.Params("id")
		if err := s.store.DeleteUser(id); err != nil {
			return err
		}

		return c.JSON(&fiber.Map{
			"id":  id,
			"msg": "User Deleted",
		})
	})

	fmt.Println("Server Listening at http://localhost:8000")
	app.Listen(s.port)
}
func GetIdFromParams(c *fiber.Ctx) (string, error) {
	id := c.Params("id")
	if id == "" {
		c.JSON(&fiber.Map{"err": "Params id not found"})

	}
	return id, nil
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzQXQiOjkwMDAwMDAwMDAwMCwidXNlciI6Im1hcmlvMTIzQGdtYWlsLmNvbSJ9.ocwO9j4yVkgY9Y20UpunAXnfqMjHNDwW0iWUBx-5-CE
// {
//   "username":"maro",
//   "email":"mario@gmail.com",
//   "password":"pwdmario"
// }
