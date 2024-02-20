"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { registerUserService,loginUserService } from "@/data/services/auth-service";

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const response = await registerUserService(validatedFields.data);
  const responseData = await response.json();

  if (!response.ok && responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  } else {
    cookies().set("jwt", responseData.jwt);
    redirect("/dashboard");
  }
}

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const response = await loginUserService(validatedFields.data);
  const responseData = await response.json();

  if (!response.ok && responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  } else {
    cookies().set("jwt", responseData.jwt);
    redirect("/dashboard");
  }
}

export async function logoutAction() {
  cookies().delete("jwt");
  redirect("/");
  return { ok: true };
}


/*

export const getAccessToken = async (token: string) => {
  cookies().set("access-token", token, {
    path: "/",
    domain: "localhost",
    maxAge: 300,
    httpOnly: true,
    secure: false,
  });
};
*/


/*

import cookie from "cookie";
import { TOKEN_NAME } from "...";

export default (req, res) => {
  const { expiresIn, accessToken, refreshToken } = req.body;

  const cookieObj = {
    expiresIn,
    accessToken,
    refreshToken,
  };

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(TOKEN_NAME, JSON.stringify(cookieObj), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: expiresIn,
      sameSite: "strict",
      path: "/",
    })
  );
  res.status(200).json({ success: true });
};

*/