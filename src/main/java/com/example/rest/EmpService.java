package com.example.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

@RequiredArgsConstructor
public class EmpService {
    private final EmpRespository empRespository;

    public List<Emp> findAll() {
        return empRespository.findAll();
    }

    public Optional<Emp> findById(Long id) {
        return empRespository.findById(id);
    }

    public Emp save(Emp stock) {
        return empRespository.save(stock);
    }

    public void deleteById(Long id) {
        empRespository.deleteById(id);
    }
}
