export default defineNuxtPlugin(() => {
  enum ErrorCode {
    "ابتدا وارد حساب کاربری خود شوید" = 401,
    "دسترسی شما به این منابع امکان پذیر نیست" = 403,
    "خطا در برقراری ارتباط با سرور. با پشتیبان سایت تماس حاصل فرمایید" = 405,
    "صفحه مورد نظر یافت نشد" = 404,
    "صفحه مورد نظر از سامانه حذف شده است" = 410,
    "خطا در برقراری ارتباط با سرور. دوباره تلاش کنید" = 500,
  }

  const cookie = useCookie("_token");
  let access_token = null;
  if (cookie.value) {
    access_token = cookie.value;
  }
  const fetchInstance = $fetch.create({
    onRequest({ options }) {
      if (access_token) {
        // @ts-expect-error i don't know
        const headers = (options.headers ||= {});
        if (Array.isArray(headers)) {
          headers.push(["Authorization", access_token]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", access_token);
        } else {
          // @ts-expect-error i don't know
          headers.Authorization = access_token;
        }
      }
    },
    onResponseError({ response }) {
      throw createError({
        statusCode: response.status,
        message: ErrorCode[response.status],
      });
    },
  });
  return {
    provide: {
      fetch: fetchInstance,
    },
  };
});
