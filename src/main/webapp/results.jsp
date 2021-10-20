<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 20.10.2021
  Time: 21:47
  To change this template use File | Settings | File Templates.
--%>
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
    <p>hello</p>
    <tr>
        <td>
            <jsp:include page="result_table.jsp" />
        </td>
    </tr>
</table>

</body>
</html>
