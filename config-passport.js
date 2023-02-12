//* подключаем passport.js
const passport = require('passport');
//* подключаем  локальную стратегию для аутотентификации
const LocalStrategy = require('passport-local').Strategy;

//* фейковый пользователь
//* пасспорт ожидает всегда два инпута: email and password
const userDB = {
  id: 136345,
  email: 'test@mail.ru',
  password: '123',
};

//*
passport.serializeUser((user, done) => {
  console.log('Сериализация: ', user);
  done(null, user.id);
});

//* при десериализации пасспорт находит юзера по id
passport.deserializeUser((id, done) => {
  console.log('Десериализация: ', id);
  const user = userDB.id === id ? userDB : false;
  done(null, user);
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, ((
    email,
    password,
    done,
  ) => {
    if (email === userDB.email && password === userDB.password) {
      return done(null, userDB);
    }
    return done(null, false);
  })),
);
