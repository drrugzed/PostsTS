import { observer } from "mobx-react-lite";
import PostStore from "@stores/PostStore";
import ModalStore from "@stores/ModalStore";
import { PostCard } from "@components/PostCard/PostCard";
import { Box, Button } from "@mui/material";
import { PostModal } from "@components/ModalAddPost/PostModal";
export const PostPage = observer(() => {
  const createNewPost = () => {
    ModalStore.modalOpen(null);
  }; // что
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <h2>Все посты</h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        {PostStore.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <Button
          sx={{ backgroundColor: "#1976d2", color: "whitesmoke" }}
          onClick={createNewPost}
        >
          Создать пост
        </Button>
        <PostModal />
      </Box>
    </Box>
  );
});
// Блок 1: Основы типов (задачи 1-5)
// Задача 1
// console.log(typeof 42); // number  + 
// console.log(typeof "42"); // string +
// console.log(typeof "42"); // string +
// console.log(typeof true); // boolean  +
// console.log(typeof null); // object +
// console.log(typeof undefined); // undefined + 
// Что выведет код?
// Задача 2
// let x = "123";
// let y = 456;
// console.log(typeof x); // string +
// console.log(typeof y); // number + 
// console.log(typeof (x + y)); // string + 
// Что выведет код?
// Задача 3
// console.log(Array.isArray([])); // true
// console.log(Array.isArray({})); // false
// console.log(typeof []); object
// console.log(typeof {}); object
// Что выведет код?
// Задача 4
// let a;
// let b = null;
// console.log(typeof a); undefined
// console.log(typeof b); object
// console.log(a === b); false 
// console.log(a == b); true 
// Что выведет код?
// Задача 5
// console.log(typeof NaN); number
// console.log(typeof Infinity); number
// console.log(typeof -Infinity); number
// Что выведет код?
// Блок 2: Явное преобразование (задачи 6-10)
// Задача 6
// console.log(String(123)); "123"
// console.log(String(true)); "true"
// console.log(String(null)); "null"
// console.log(String(undefined)); "undefined"
// Что выведет код?
// Задача 7
// console.log(Number("456")); 456
// console.log(Number("")); 0
// console.log(Number(" ")); 1 0 - пробел считается как пустая строка
// console.log(Number("abc")); NaN
// console.log(Number(true)); 1
// console.log(Number(false)); 0
// Что выведет код?
// Задача 8
// javascriptconsole.log(parseInt("123px")); 123
// console.log(parseInt("px123")); 123
// console.log(parseFloat("12.34abc")); 12.34
// console.log(parseFloat("abc12.34")); 12.34
// Что выведет код?
// Задача 9
// console.log(Boolean(1)); true
// console.log(Boolean(0)); false
// console.log(Boolean("")); false
// console.log(Boolean("0")); true
// console.log(Boolean([])); true
// console.log(Boolean({})); true
// Что выведет код?
// Задача 10
// console.log(!!true); true
// console.log(!!false); false
// console.log(!!"hello"); true
// console.log(!!""); false
// console.log(!!0); false
// console.log(!!1); true
// Что выведет код?
// Блок 3: Оператор + (задачи 11-15)
// Задача 11
// console.log(5 + 3); 8 
// console.log(5 + "3"); "53"
// console.log("5" + 3); "53"
// console.log("5" + "3"); "53"
// Что выведет код?
// Задача 12
// console.log(1 + 2 + "3"); "33"
// console.log("1" + 2 + 3); "123"
// console.log(1 + "2" + 3); "123"
// Что выведет код?
// Задача 13
// javascriptconsole.log(+"42"); 42 
// console.log(+true); 1 
// console.log(+false); 0 
// console.log(+null); 0
// console.log(+undefined); 0 (NaN)
// console.log(+""); 0
// Что выведет код?
// Задача 14
// console.log(+[]); 0 
// console.log(+[42]); 42 
// console.log(+[1, 2]); NaN
// console.log(+{}); NaN
// Что выведет код?
// Задача 15
// let x = "10";
// let y = "20";
// console.log(x + y); "1020"
// console.log(+x + +y); 30
// console.log(Number(x) + Number(y)); 30
// Что выведет код?
// Блок 4: Другие арифметические операторы (задачи 16-20)
// Задача 16
// console.log("10" - "3"); 7 
// console.log("10" * "2"); 20
// console.log("10" / "2"); 5 
// console.log("10" % "3"); 1 
// Что выведет код?
// Задача 17
// console.log("abc" - 5); NaN
// console.log("5" - "abc"); NaN
// console.log("abc" * "def"); NaN
// Что выведет код?
// Задача 18
// javascriptconsole.log(true - false); 1 
// console.log(true * 3); 3 
// console.log(false / 2); 0
// Что выведет код?
// Задача 19
// javascriptconsole.log(null - 5); -5 
// console.log(undefined - 5); NaN
// console.log(null * 2); 0
// console.log(undefined * 2); NaN
// Что выведет код?
// Задача 20
// javascriptconsole.log([2] - [1]); 1 
// console.log([5] * [3]); 15 
// console.log("5" - [2]); 3 
// Что выведет код?
// Блок 5: Сравнения (задачи 21-25)
// Задача 21
// javascriptconsole.log(5 == "5"); true
// console.log(5 === "5"); false 
// console.log(0 == false); true
// console.log(0 === false); false
// Что выведет код?
// Задача 22
// javascriptconsole.log("" == 0); true
// console.log("" === 0); false
// console.log(" " == 0); false(объясни почему true) спецСлучай 
// console.log(" " === 0); false
// Что выведет код?
// Задача 23
// javascriptconsole.log(null == undefined); true(объясни почему ) специально в стандарте
// console.log(null === undefined); false
// console.log(null == 0); true (false)
// console.log(undefined == 0); true (false)
// Что выведет код?
// Задача 24
// javascriptconsole.log([] == false); true
// console.log([] === false); false
// console.log({} == false); false
// console.log({} === false); false
// Что выведет код?
// Задача 25
// console.log(NaN == NaN); false(объясни почему)
// console.log(NaN === NaN); false(объясни почему)
// console.log(isNaN(NaN)); true
// console.log(Number.isNaN(NaN)); true(и как это работает)
// console.log(isNaN("hello")); true
// console.log(Number.isNaN("hello")); true(false но почему и как работает)
// Что выведет код?
// Блок 6: Сложные случаи (задачи 26-30)
// Задача 26
// javascriptconsole.log([] + []); ''
// console.log([] + {}); 'object Object'
// console.log({} + []); 0 
// console.log(({}) + []); '[object Object]' (как это работает объясни)
// Что выведет код?
// Задача 27
// javascriptconsole.log([1, 2] + [3, 4]); тоже не знаю как это работает
// console.log([1] + [2]); 12
// console.log([5] - [3]); 2
// Что выведет код?
// Задача 28
// if ("") console.log("A"); ничего не выведется 
// if ("0") console.log("B"); "B"
// if (0) console.log("C"); ничего не выведется 
// if ([]) console.log("D"); "D"
// if ({}) console.log("E"); "E"
// Что выведет код?
// Задача 29
// let obj = {
//   valueOf() { return 10; },
//   toString() { return "20"; }
// };

// console.log(+obj); 10
// console.log(String(obj));"20"
// console.log(obj + ""); "200"
// Что выведет код?
// Задача 30
// javascriptconsole.log(1 < 2 < 3); true
// console.log(3 > 2 > 1); true
// console.log(false == false == false); true
// console.log(true + true + true); 3 
