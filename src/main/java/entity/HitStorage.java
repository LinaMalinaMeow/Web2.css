package entity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class HitStorage {
    private final List<Hit> hitList;

    public HitStorage() {
        hitList = new ArrayList<>();
    }

    public void add(Hit hit) {
        hitList.add(hit);
    }

    public List<Hit> getPoints() {
        return hitList.stream().sorted().collect(Collectors.toList());
    }
}
