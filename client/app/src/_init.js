(function(){
  "use strict";
  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      var socket = io();
      var users;

      socket.on("users.refresh", function(u){
        users = u;
        updateUI();
      });

      init();


      function init(){
        var me = Math.random();
        console.log("NEW");
        socket.emit('anonymous.new', { name : faker.directive("firstName")() + " " + faker.directive("lastName")() }, function(data){
          console.log("return", data);
        });
      }

      function updateUI(){
        document.getElementById("user-list").innerHTML = '';
        _.each(users, function(user){
          document.getElementById("user-list").innerHTML += "<li>" + user.name + "</li>";
        })
      }




    }
  }
})()