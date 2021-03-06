package servlets;

import javax.jws.WebService;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
//@WebServlet("/filter")
public class ControllerServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("x") != null &&
                request.getParameter("y") != null &&
                request.getParameter("r") != null) {
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
        } else {
            String clear = request.getParameter("clear");
            if (clear != null && clear.equals("true")) {
                getServletContext().getNamedDispatcher("ClearTableServlet").forward(request, response);
            } else {
                getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
            }
        }
    }
}