package useint

import (
	"p2pstore/core"
	"p2pstore/group"
	"p2pstore/p2p"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/template/html"
	"github.com/pkg/browser"
)

func InitializeGUI() {

	engine := html.New("./public", ".html") //go template engine is in use

	app := fiber.New(fiber.Config{
		Views: engine, //setting that engine to views
	})
	app.Static(
		"/static",  // mount address
		"./public", // path to the file folder
	)
	app.Get("/", func(c *fiber.Ctx) error {
		grpnamedisp := strings.Split(group.CurrentGroupRoom.GroupName, "/")
		count := len(core.Gdisp.PeerList())

		return c.Render("index", fiber.Map{"peerid": p2p.Peerdisp, "grpname": grpnamedisp[0], "nopeer": count})
	})
	app.Get("/metrics", monitor.New(monitor.Config{Title: " "}))
	app.Get("/getmsg", func(c *fiber.Ctx) error {
		if !group.Mutex {

			return c.JSON(fiber.Map{"sender": "Nil", "msg": "Nil"})
		}
		group.Mutex = false

		return c.JSON(fiber.Map{"sender": group.Sender, "msg": group.Msg})
	})

	app.Get("/getcount", func(c *fiber.Ctx) error {
		grpnamedisp := strings.Split(group.CurrentGroupRoom.GroupName, "/")
		count := len(core.Gdisp.PeerList())

		return c.JSON(fiber.Map{"count": count, "grpname": grpnamedisp[0], "list": core.Gdisp.PeerList()})
	})

	app.Listen("127.0.0.1:8000")
	url := "127.0.0.1:8000"

	browser.OpenURL(url)

}
