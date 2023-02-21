import makeUserService from "../../service/user/UserService";

test("If an user is added, then the user should be in the user list", async () => {
  const userService = makeUserService();
  const user = await userService.register("hcgubben", "tensta");
  if (user) {
    const userToCheck = await userService.getUser(user.id);
    if (userToCheck) {
      expect(user.username === userToCheck.username).toBeTruthy();
    }
  }
});
