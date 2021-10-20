<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<table align="center" class="result_table">
    <jsp:useBean id="hit" class="entity.Hit" scope="session"/>
    <tr>
        <th class="variable">X</th>
        <th class="variable">Y</th>
        <th class="variable">R</th>
        <th>Попадание</th>
        <th>Время исполнения</th>
        <th>Текущее время</th>
    </tr>
    <tbody>
    <tr>
        <th class='the_X'><jsp:getProperty name="hit" property="x"/>
        </th>
        <th class='the_Y'><jsp:getProperty name="hit" property="y"/>
        </th>
        <th class='the_R'><jsp:getProperty name="hit" property="r"/>
        </th>
        <th class='the_Result' style='color:<%=(hit.getCheckHit().equals("Yes") ? "lime" : "red")%>'><jsp:getProperty name="hit" property="checkHit"/>
        </th>
        <th><jsp:getProperty name="hit" property="execTime"/>
        </th>
        <th><jsp:getProperty name="hit" property="localDateTime"/>
        </th>
    </tr>
    </tbody>
</table>