package types

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string
	Email    string
	Password string
}
type Note struct {
	gorm.Model
	Title   string
	Content string
	Tags    string
	UserId  string
}

type UserResponse struct {
	Token string `json:"token"`
	User  *User  `json:"user"`
}

func CreateJwtAuthToken(u uint) (string, error) {
	fmt.Println("inside jwt token generate", u)
	secret := "aanndj"
	claims := &jwt.MapClaims{
		"expiresAt": 15 * time.Minute,
		"user":      u,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
func ValidateJwtAuthToken(tokenString string) (*jwt.Token, error) {
	secret := "aanndj"

	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
}
