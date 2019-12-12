package com.example.datatables.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.datatables.io.entity.Car;
import com.example.datatables.io.repository.CarRepository;
import com.example.datatables.service.CarService;
import com.example.datatables.shared.Filter;

@Service
public class CarServiceImpl implements CarService {

	@Autowired
	@Lazy
	private CarRepository carRepository;

	@Override
	public Page<Car> getAll(Filter filterDTO) {
		PageRequest pageable = PageRequest.of(filterDTO.getPage() <= 0 ? 0 : filterDTO.getPage() - 1, filterDTO.getLimit(), filterDTO.getDirection(), filterDTO.getOrderBy());
		if (!StringUtils.isEmpty(filterDTO.getSearchText())) {
			return carRepository.findAllByCarNameContainsIgnoreCase(filterDTO.getSearchText(), pageable);
		}
		return carRepository.findAll(pageable);
	}
}
