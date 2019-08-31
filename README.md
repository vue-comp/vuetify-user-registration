# vuetify-user-registration
Компонент формы диалогового окна регистрации пользователей, использующий связку 
vue/vuetify с гибикими настройками

--------------------------
Установка: npm i vuetify-user-registration

--------------------------
Использование

Импорт компонента: 
```javascript  
import userRegistration from 'vuetify-user-registration'
```
Регистрация компонента:
```javascript 
export default {
    components: {
        'user-registration': userRegistration
    } 
```
Пример использования: 
```html 
<user-registration max-width="700px" :options="options"
     :show=showDialog  @closed="showDialog=$event"></user-registration>
```

---------------------------
Описание параметров компонента

1. max-width - максимальная ширина диалогового окна в пикселях (string). Не обязательный. По умолчанию растягивается на всю ширину.
2. showDialog  - переменная, необходимая для отображения/скрытия диалогового окна (boolean). Обязательный
3. options - опции регистрации пользователя (object). Обязательный.

Пример использования options:
```javascript
options: {
      nameForm: "Регистрация пользователя",
      url : "http://192.168.0.83:27333/api/v1/add_user",
      login: {name:"login", label:"Имя пользователя", max: 14, character:true},
      password: {name:"password", label:"Password",  min: 6},
      surname: {name:"surname", label:"Фамилия", required: true, min:2, max:15},
      name: {name:"name", label:"Имя", min:2, max:10},
      birthDay: {name:"birth_day", label:"Дата рождения"},
      email: {name:"email", label: "Электронная почта", confirm: true, required: true},
      phone: {name:"phone", label:"Мобильный телефон", confirmUrl: "http://192.168.3.101:27333/api/v1/confirm_phone", required: true}
}
```
---------------------------
Описание параметров options

1. nameForm - имя формы (string). Не обязательный. По умолчанию 'User Registration'
2. url - rest api сервера для добавления пользователя (string). Обязательный.
3. login - поле для ввода имя пользователя. Обязательный.
4. password - поле для ввода пароля. Обязательный.
5. surname - поле для ввода фамилии. Не обязательный.
6. name - поле для ввода имени. Не обязательный.
7. birthDay - поле для выбора даты рождения. Не обязательный.
8. email - поле для ввода адреса электронной почты. Не обязательный.
9. phone - поле для ввода мобильного телефона. Не обязательный.

Если не передать, не обязательное поле, то оно не будет отображаться на форме.

----------------------------
Описание параметров внутри поля ввода
1. name (string) - параметр, который будет использоваться при отправке формы post запросом. Обязательный.
2. label (string) - имя поля ввода, которое будет отображаться пользователю. Не обязательный.
3. max (number) - максимальное количество символов в поле. Не обязательный.
4. min (number) - минимальное количество символов в поле. Не обязательный.
5. character (boolean) - используется в поле login и разрешает ввод только букв и цифр, 
при этом первый символ обязательно должна быть буква. Не обязательный.
6. required (boolean) - делает поле обязательным для заполнения на форме. Не обязательный. 
Для login и password по умолчанию: true, для остальных полей по умолчанию false.
7. confirm (boolean) - параметр для подтверждения электронной почты. 
Используется в поле email. Не обязательный. По умолчанию false. При использовании подтверждения 
почты сервер должен реализовать передачу ссылки подтверждения на адрес электронный почты, 
при добавлении нового пользователя.
8. confirmUrl (string) - url для подтверждения телефона. Используется в поле phone. Не обязательный.
При использовании подтверждения телефона сервер должен реализовать отправку кода подтверждения на
мобильный телефон, при добавлении пользователя. Также на сервере должно быть реализовано 
rest api, указанное в confirmUrl. 
Требования к реализации rest api на сервере для корректной работы:
    -  Http метод должен быть POST;
    -  В данных формы необходимо передавать обязательный параметр code_phone, в который необходимо 
    передать код, который ввел пользователь;
    - Сервер должен обеспечивать проверку ввода кода и возвращать код статуса 200, если проверка
    пройдена и код статуса 401/403 в случае, если код подтверждения не верный.

----------------------------
Дополнительно

Для корректных отображений ошибок сервер должен возвращать json c полем error