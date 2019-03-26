import React from 'react';

import Header from "./Header";

const Agreement = () => {
  return (
    <div>
      <Header />
      <br />
      <div className="agreement container">
        <h1 className="agreement-title">Политика конфиденциальности</h1>
        <p>Наш интернет-магазин уважительно относится к правам клиента. Соблюдается строгая конфиденциальность при оформлении заказа. Сведения надёжно сохраняются и защищены от передачи. Согласием на обработку данных клиента исключительно с целью оказания услуг является размещение заказа на сайте. К персональным данным относится личная информация о клиенте: домашний адрес; имя, фамилия, отчество; сведения о рождении; имущественное, семейное положение; личные контакты (телефон, электронная почта) и прочие сведения, которые перечислены в Законе РФ № 152-ФЗ «О персональных данных» от 27 июля 2006 г. Клиент вправе отказаться от обработки персональных данных. Нами в данном случае гарантируется удаление с сайта всех персональных данных в трёхдневный срок в рабочее время. Подобный отказ клиент может оформить простым электронным письмом на адрес, указанный на странице нашего сайта.</p>
      </div>
    </div>
  )
}

export default Agreement;