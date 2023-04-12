
// Client facing scripts here
$(document).ready(function() {

  $.ajax({
    method: 'GET',
    url: '/get_todo'
  })
  .done((response) => {
    // const $usersList = $('#users');
    // $usersList.empty();

    // for(const user of response.users) {
    //   $(`<li class="user">`).text(user.email).appendTo($usersList);
    // }
    // category_id:1
    // complete: false
    // id: 1
    // post_date: "2023-04-12T08:06:00.000Z"
    // title: "FIVE GUYS Hamburger"
    // user_id: 1
    console.log(response);

    const creatList = (item) => {
      const listDiv = document.createElement('div');
      listDiv.classList.add('lists');
      const listWrap = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      const title = document.createElement('p');
      title.textContent = item.title;
      const postDate = document.createElement('span');
      postDate.textContent = item.post_date;
      const timePast = document.createElement('p');
      const postDateObj = new Date(item.post_date);
      const now = new Date();
      const diffTime = Math.abs(now - postDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      timePast.textContent = `${diffDays} days ago`;
      listWrap.appendChild(checkbox);
      listWrap.appendChild(title);
      title.appendChild(postDate);
      listDiv.appendChild(listWrap);
      listDiv.appendChild(timePast);
      return listDiv;
    };

    const eatList = document.querySelector('.to-eat .todo-list');
    const watchList = document.querySelector('.to-watch .todo-list');
    const buyList = document.querySelector('.to-buy .todo-list');
    const readList = document.querySelector('.to-read .todo-list');
    const cateList = [eatList, watchList, buyList, readList];
    for (let i = 0; i < cateList.length; i++) {
      for (const item of response) {
        if (item.category_id === i + 1) {
          const listElement = creatList(item);
          cateList[i].appendChild(listElement);
        }
      }
    }

    const eatListButton = document.querySelector('.to-eat button');
    const watchListButton = document.querySelector('.to-watch button');
    const buyListButton = document.querySelector('.to-buy button');
    const readListButton = document.querySelector('.to-read button');
    const buttons = [eatListButton, watchListButton, buyListButton, readListButton];
    const listText = ["Restaurants</br>on the lists", "Movies</br>on the lists", "Items</br>on the lists", "Books</br>on the lists"];

    for (let i = 0; i < cateList.length; i++) {
      const countWrap = document.createElement('div');
      const countText = document.createElement('p');
      countText.innerHTML = listText[i];
      countWrap.appendChild(countText);

      const count = cateList[i].querySelectorAll('.lists').length;
      const countNum = document.createElement('p');
      countNum.textContent = count;
      countWrap.appendChild(countNum);
      buttons[i].appendChild(countWrap);
    }
  });

  // const coll = $(".collapsible");

  //collapsible animation for each category's list
  const coll = document.getElementsByClassName("collapsible");


  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }

});

