$(function(){
  function buildHTML(message){
    if (message.image) {  // メッセージに画像が含まれている場合
      var html =
       `<div class="main-chat__message-list__member-info">
          <div class="main-chat__message-list__member-info__member">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__member-info__posted-date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__member-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <div class="lower-message__image">
            ${message.image}
          </div>
        </div>`
    } else {
      var html =
       `<div class="main-chat__message-list__member-info">
          <div class="main-chat__message-list__member-info__member">
            ${message.user_name}
          </div>
          <div class="main-chat__message-list__member-info__posted-date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__message-list__member-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>`
    }
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.main-chat__message-from__form-group__btn--send').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
})