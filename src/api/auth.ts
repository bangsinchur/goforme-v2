const API = process.env.NEXT_PUBLIC_API_URL;

const signupService = {
  signUp: async (data: any) => {
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        throw new Error("이미 존재하는 사용자 입니다.");
      }
    }
  },
  checkNickName: async (data: { nickName: string }) => {
    try {
      const res = await fetch(`${API}/auth/check/nickName`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        throw new Error("닉네임이 존재하지 않습니다.");
      }
    }
  },
  checkEmail: async (data: { email: string; password: string }) => {
    try {
      const res = await fetch(`${API}/auth/check/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        throw new Error("이메일이 존재하지 않습니다.");
      }
    }
  },
};
