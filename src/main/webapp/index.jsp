<%--
  Created by IntelliJ IDEA.
  User: alina
  Date: 16.10.2021
  Time: 18:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<jsp:useBean id="hits" class="entity.HitStorage" scope="session"/>
<jsp:useBean id="hit" class="entity.Hit" scope="session"/>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Лаба 2</title>
    <link rel="stylesheet" href="style.css">
</head>

<body onload="draw()">
<div class="header">
    <b>
        <span id="left-header">Сагайдак Алина Алексеевна P3211 </span>
        <span id="right-header">Вариант: 13 </span>
    </b>
</div>

<form id="form" method="get" action="filter">
    <div id="box">
        <div class="arg">
            <canvas id="canvas" width="300px" height="300px">
            </canvas>
        </div>
        <div class="arg">
            <span>
					<label for='x_arg'><b>Введите X:</b></label>
					<br>
                	<select id='x_arg' name="x">
                        <option name="x" value="-5">-5</option>
                        <option name="x" value="-4">-4</option>
						<option name="x" value="-3">-3</option>
						<option name="x" value="-2">-2</option>
						<option name="x" value="-1">-1</option>
						<option name="x" value="0">0</option>
						<option name="x" value="1">1</option>
						<option name="x" value="2">2</option>
						<option name="x" value="3">3</option>
					</select>
				</span>
        </div>
        <div class="arg">
            <span>
					<label for="y_arg"><b>Введите Y:<br></b></label>
					<textarea id="y_arg" name="y" placeholder="Введите число ∈ (-3;5)" maxlength="10"></textarea>
			        <p id="wrong_field_Y"></p>
            </span>
        </div>
        <div class="arg">
            <span>
					<label for='r_arg'><b>Введите R:</b></label>
					<br>
					<select id='r_arg' name="r" onchange="changeR()">
						<option name="r" value="1">1</option>
						<option name="r" value="2">2</option>
						<option name="r" value="3">3</option>
						<option name="r" value="4">4</option>
						<option name="r" value="5" selected="selected">5</option>
					</select>
				</span>
        </div>

    </div>

    <div class="submitter">
        <button id="submit_button" type="submit">Отправить
        </button>
        <button id="clear_button" onclick="clear_table()">Очистить
            историю
        </button>
    </div>

</form>

<div>
    <table id="history-table">
        <tr>
            <td>
                <b>X</b>
            </td>

            <td>
                <b>Y</b>
            </td>

            <td>
                <b>R</b>
            </td>

            <td>
                <b>Попадание</b>
            </td>

            <td>
                <b>Время исполнения</b>
            </td>

            <td>
                <b>Текущее время</b>
            </td>
        </tr>
        <%--@elvariable id="hits" type="java.util.List"--%>
        <c:if test="${hits != null && hits.points != null}">
            <c:forEach var="hit" items="${hits.points}" varStatus="status">
                <tr>
                    <td><b>
                        <fmt:formatNumber type="number" pattern="#.########" value="${hit.x}"
                                          var="pat"/>
                            ${fn:replace(pat, ",", ".")}
                    </b></td>
                    <td><b>
                        <fmt:formatNumber type="number" pattern="#.########" value="${hit.y}"
                                          var="pat"/>
                            ${fn:replace(pat, ",", ".")}
                    </b></td>
                    <td><b>
                        <fmt:formatNumber type="number" pattern="#.########" value="${hit.r}"
                                          var="pat"/>
                            ${fn:replace(pat, ",", ".")}
                    </b></td>
                    <td><b>
                            ${hit.checkHit}
                    </b></td>
                    <td><b>
                        <fmt:formatNumber type="number" pattern="#.########"
                                          value="${hit.execTime}" var="pat"/>
                            ${fn:replace(pat, ",", ".")}
                    </b></td>
                    <td><b>
                            ${hit.localDateTime}
                    </b></td>
                </tr>
            </c:forEach>
        </c:if>
        <%--                <%--%>
        <%--                    List<Hit> hits = (List<Hit>) request.getSession().getAttribute("hits");--%>
        <%--                    if (hits != null) {--%>
        <%--                        for (int i = hits.size() - 1; i >= 0; i--) {--%>
        <%--                            out.println("<tr>");--%>
        <%--                            double x = hits.get(i).getX();--%>
        <%--                            double y = hits.get(i).getY();--%>
        <%--                            double r = hits.get(i).getR();--%>
        <%--                            NumberFormat nf = new DecimalFormat("#.########");--%>
        <%--                            out.println("<td><b>" + nf.format(x).replace(",", ".") + "</b></td>");--%>
        <%--                            out.println("<td><b>" + nf.format(y).replace(",", ".") + "</b></td>");--%>
        <%--                            out.println("<td><b>" + nf.format(r).replace(",", ".") + "</b></td>");--%>
        <%--                            out.println("<td><b>" + hits.get(i).isCheckHit() + "</b></td>");--%>
        <%--                            out.println("<td><b>" + nf.format(hits.get(i).getExecTime()).replace(",", ".") + "</b></td>");--%>
        <%--                            out.println("<td><b>" + hits.get(i).getLocalDateTime() + "</b></td>");--%>
        <%--                            out.println("</tr>");--%>
        <%--                        }--%>
        <%--                    }--%>
        <%--                %>--%>
    </table>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="canvas.js"></script>
<script src="script.js"></script>
</body>

</html>
>
