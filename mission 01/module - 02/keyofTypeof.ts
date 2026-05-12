//? keyof = object er sob key ber kore:

//typeof = value = type
//keyof = keys

const role = {
    Admin: "ADMIN",
    User: "USER"
} as const

type RoleKeys = keyof typeof role;
//output: "Admin" | "User"

//Value ber korar jonno:
type RoleValues = typeof role[keyof typeof role];


