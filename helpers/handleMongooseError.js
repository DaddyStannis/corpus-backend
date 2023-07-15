function handleMongooseError(error, data, next) {
  const { name, code } = error;
  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  error.message =
    code === 11000 && name === "MongoServerError"
      ? "Категорія з такою назвою/такий артикул вже є в базі"
      : "Щось пішло не так, спробуйте ще раз пізніше";
  next();
}

export default handleMongooseError;
