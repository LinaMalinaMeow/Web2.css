package entity;

import java.math.BigDecimal;

public class Hit implements Comparable<Hit>{

    private double x;
    private double y;
    private double r;
    private String localDateTime;
    private String checkHit;
    private BigDecimal execTime;
    private boolean isValid = true;

    public Hit(double x, double y, double r, String localDateTime, String checkHit, BigDecimal execTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.localDateTime = localDateTime;
        this.checkHit = checkHit;
        this.execTime = execTime;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public Hit() {
    }

    public BigDecimal getExecTime() {
        return execTime;
    }

    public void setExecTime(BigDecimal execTime) {
        this.execTime = execTime;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setLocalDateTime(String localDateTime) {
        this.localDateTime = localDateTime;
    }

    public void setCheckHit(String checkHit) {
        this.checkHit = checkHit;
    }


    public String getLocalDateTime() {
        return localDateTime;
    }

    public String getCheckHit() {
        return checkHit;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }


    public String toJson() {
        return "{" +
                "\"x\":" + x + ',' +
                "\"y\":" + y + ',' +
                "\"r\":" + r + ',' +
                "\"time\":" + "\"" + localDateTime + "\"" + ',' +
                "\"exec_time\":" + execTime + ',' +
                "\"check\":" + "\"" + checkHit + "\"" + ',' +
                "\"isValid\":" + isValid +
                "}";
    }


    @Override
    public int compareTo(Hit o) {
        return o.localDateTime.compareTo(localDateTime);
    }
}