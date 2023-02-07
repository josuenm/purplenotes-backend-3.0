interface SignUpDTO {
  name: string;
  email: string;
  password: string;
}

interface SignInDTO {
  email: string;
  password: string;
}

interface UserUpdateDTO {
  name: string;
  email: string;
  password: string;
}

export { SignUpDTO, SignInDTO, UserUpdateDTO };
