package com.example.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/emps")
@Slf4j
@RequiredArgsConstructor
public class EmpAPI {
    private final EmpService empServiceService;

    @GetMapping
    public ResponseEntity<List<Emp>> findAll() {
        return ResponseEntity.ok(empServiceService.findAll());
    }

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody Emp emp) {
        return ResponseEntity.ok(empServiceService.save(emp));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emp> findById(@PathVariable Long id) {
        Optional<Emp> stock = empServiceService.findById(id);
        if (!stock.isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(stock.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Emp> update(@PathVariable Long id, @Valid @RequestBody Emp emp) {
        if (!empServiceService.findById(id).isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(empServiceService.save(emp));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        if (!empServiceService.findById(id).isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }
        empServiceService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
