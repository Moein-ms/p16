$(document).ready(function () {
  setTimeout(function(){
    $(".lod").fadeOut(1000, function() {
        $(this).remove(); // حذف کامل از DOM بعد از فیداوت
    });
    $(".title").removeClass("d-none").hide().fadeIn(1000);
    $(".base").removeClass("d-none").hide().fadeIn(1000);
}, 5000);

    let check_tekrary = new Set();
    $(".N_inp, .LN_inp, .E_inp").val(""); // پاک کردن ورودی‌ها
    let targetColumn = 0; // پیش‌فرض: جستجو در ستون Name
  
    $(".btn_column").click(function () {
      targetColumn = $(this).data("column"); // گرفتن مقدار ستون از data-column
      $(".btn_column").removeClass("btn-primary").addClass("bg-black");
      $(this).removeClass("bg-black").addClass("btn-primary");
    });
  
    $(".btn_search").click(function () {
      let targ = $(".inp_s").val().toLowerCase();
      let rows = $(".table tbody tr");
  
      rows.each(function (index, item) {
        let cellText = item.children[targetColumn].textContent.toLowerCase();
        // فقط در ستون مورد نظر سرچ می‌کند
        item.classList.add("d-none");
  
        if (cellText.includes(targ)) {
          item.classList.remove("d-none");
        }
      });
    });
  
    $(".btn_add").click(function () {
      let Name = $(".N_inp").val().trim();
      let Last_Name = $(".LN_inp").val().trim();
      let Email = $(".E_inp").val().trim();
  
      // تابع برای بررسی خالی بودن ورودی‌ها
      function empty_box() {
        if (Name === "" || Email === "" || Last_Name === "") {
          $(".N_inp, .LN_inp, .E_inp").addClass("shake");
          $(".N_inp, .LN_inp, .E_inp").val(""); // پاک کردن ورودی‌ها
          setTimeout(() => {
            $(".N_inp, .LN_inp, .E_inp").removeClass("shake");
          }, 300);
          return true;
        }
        return false;
      }
  
      // اگر ورودی‌ها خالی هستند، از ادامه کار جلوگیری می‌شود
      if (empty_box()) {
        return;
      }
  

      let fullEmail = Email + "@gmail.com"; // تکمیل ایمیل
      let fullName = Name;
      let fullLastName = Last_Name;
  
      // بررسی اینکه ایمیل قبلاً ثبت نشده باشد
      if (check_tekrary.has(fullEmail)||check_tekrary.has(fullName)||check_tekrary.has(fullLastName)) {
        alert("این ایمیل قبلاً ثبت شده است!");
        return;
      }
  
    check_tekrary.add(fullEmail); // اضافه کردن ایمیل جدید به Set
    check_tekrary.add(fullName); // اضافه کردن نام جدید به Set
    check_tekrary.add(fullLastName); // اضافه کردن نام خانوادگی جدید به Set
  
      let new_tr = document.createElement("tr");
      new_tr.innerHTML = `
        <td>${Name}</td>
        <td>${Last_Name}</td>
        <td>${fullEmail}</td>
        <td>
          <button class="btn bg-bg delete_item w-100"><i class="bi bi-x-square"></i></button>
        </td>
      `;
  
      $("tbody").prepend(new_tr); // اضافه کردن ردیف جدید به جدول
      $(".N_inp, .LN_inp, .E_inp").val(""); // پاک کردن ورودی‌ها
    });
  
    $(document).on("click", ".delete_item", function () {
        let row = $(this).closest("tr"); // گرفتن ردیف مورد نظر
        let email = row.find("td:nth-child(3)").text(); // گرفتن ایمیل از جدول
        let name = row.find("td:nth-child(1)").text(); // گرفتن نام از جدول
        let lastName = row.find("td:nth-child(2)").text(); // گرفتن نام خانوادگی از جدول

        // حذف ایمیل و نام از Set
        check_tekrary.delete(email); // حذف ایمیل از Set
        check_tekrary.delete(name); // حذف نام از Set
        check_tekrary.delete(lastName); // حذف نام خانوادگی از Set

        row.remove(); // حذف ردیف جدول
    });




   document.querySelector(".botten").addEventListener("click", function() {
       window.scrollTo({
           top: window.innerHeight, // اسکرول به اندازه ارتفاع صفحه
           behavior: "smooth" // اسکرول نرم
       });
   });

  });
  