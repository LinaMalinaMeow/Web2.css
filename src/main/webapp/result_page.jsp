<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="Web programming second lab" name="description">
    <meta content="Сагайдак Алина Алексеевна" name="author">
    <title>Check result</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

<header>
    <span id="author">
        Сагайдак Алина Алексеевна, P3211, Вариант-13
    </span>
</header>

<table class="page_table" align="center">

    <tr>
        <td>
            <p id="enter-text">Check results</p>
        </td>
    </tr>
    <tr>
        <td>
            <jsp:include page="result_table.jsp" />
        </td>
    </tr>
    <tr>
        <td>
            <form method="get" action="filter">
                <button id="button" class="back_button" type="submit">Take me back.</button>
            </form>
        </td>
    </tr>
</table>

</body>
</html>