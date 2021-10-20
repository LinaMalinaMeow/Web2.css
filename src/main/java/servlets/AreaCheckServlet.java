package servlets;

import entity.Hit;
import entity.HitStorage;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

public class AreaCheckServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long startTime = System.nanoTime();
        Hit hit;
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            double x = Double.parseDouble(request.getParameter("x"));
            double y = Double.parseDouble(request.getParameter("y"));
            double r = Double.parseDouble(request.getParameter("r"));
            if (!isValid(x, y, r) &&  request.getParameter("isFromCanvas") == null) {
                throw new NumberFormatException();
            }
            hit = getHit(request, startTime);
            HitStorage hits = (HitStorage) request.getSession().getAttribute("hits");
            if(hits == null)
                hits = new HitStorage();
            hits.add(hit);
            request.getSession().setAttribute("hits", hits);
            if(request.getParameter("isFromCanvas") == null) {
                RequestDispatcher rd = request.getRequestDispatcher("/result_page.jsp");
                request.getSession().setAttribute("hit", hit);
                rd.forward(request, response);
            } else
                out.println(hit.toJson());
        } catch (NumberFormatException e) {
            hit = new Hit();
            hit.setValid(false);
            if(request.getParameter("isFromCanvas") == null) {
                RequestDispatcher rd = request.getRequestDispatcher("/index.jsp");
                rd.forward(request, response);
            } else
                out.println(hit.toJson());
        } finally {
            out.close();
        }
    }

    private Hit getHit(HttpServletRequest request, long startTime) throws NumberFormatException {
        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));

        String currentTime = new SimpleDateFormat("HH:mm:ss").format(new Date());
        boolean checkHit = checkHit(x, y, r);
        BigDecimal pT=BigDecimal.valueOf(Double.parseDouble(String.valueOf(BigDecimal.valueOf((System.nanoTime() - startTime) / 1000000000d)).substring(0, 8)));
        return new Hit(x, y, r, currentTime, checkHit ? "Yes" : "No",
                pT);
    }

    public boolean checkHit(double x, double y, double r) {
        x = Math.abs(x);
        final double XR = r;
        final double YR = r / 2;
        return (x * x) / (XR * XR) + (y * y) / (YR * YR) <= 1 && !((x - XR / 4) * (x - XR / 4) / (XR * 0.15 * XR * 0.15) + (y - YR) * (y - YR) / (YR * 0.8 * YR * 0.8) <= 1 ||
                (x) * (x) / (XR * 0.1 * XR * 0.1) + (y - YR) * (y - YR) / (YR * 0.3 * YR * 0.3) <= 1 ||
                (x - XR / 9) * (x - XR / 9) / (XR / 9 * XR / 9) + (y + YR) * (y + YR) / (YR * 0.6 * YR * 0.6) <= 1 ||
                (x - XR / 3.2) * (x - XR / 3.2) / (XR / 9 * XR / 9) + (y + YR) * (y + YR) / (YR * 0.8 * YR * 0.8) <= 1);
    }

    public boolean isValid(double x, double y, double r) {
        return (x >= -5) && (x <= 3) && (y >= -3) && (y <= 5) && (r >= 1) && (r <= 5);
    }
}
