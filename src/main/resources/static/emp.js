var emps = [];

function findEmp (empId) {
  return emps[findEmpKey(empId)];
}

function findEmpKey (empId) {
  for (var key = 0; key < emps.length; key++) {
    if (emps[key].id == empId) {
      return key;
    }
  }
}

var empService = {
  findAll(fn) {
    axios
      .get('/api/v1/emps')
      .then(response => fn(response))
      .catch(error => console.log(error))
  },

  findById(id, fn) {
    axios
      .get('/api/v1/emps/' + id)
      .then(response => fn(response))
      .catch(error => console.log(error))
  },

  create(emp, fn) {
    axios
      .post('/api/v1/emps', emp)
      .then(response => fn(response))
      .catch(error => console.log(error))
  },

  update(id, emp, fn) {
    axios
      .put('/api/v1/emps/' + id, emp)
      .then(response => fn(response))
      .catch(error => console.log(error))
  },

  deleteEmp(id, fn) {
    axios
      .delete('/api/v1/emps/' + id)
      .then(response => fn(response))
      .catch(error => console.log(error))
  }
}

var List = Vue.extend({
  template: '#emp-list',
  data: function () {
    return {emps: [], searchKey: ''};
  },
  computed: {
    filteredEmps() {
      return this.emps.filter((emp) => {
      	return emp.name.indexOf(this.searchKey) > -1
      	  || emp.information.indexOf(this.searchKey) > -1
      	  || emp.empNumber.toString().indexOf(this.searchKey) > -1
      })
    }
  },
  mounted() {
    empService.findAll(r => {this.emps = r.data; emps = r.data})
  }
});

var Emp = Vue.extend({
  template: '#emp',
  data: function () {
    return {emp: findEmp(this.$route.params.emp_id)};
  }
});

var EmpEdit = Vue.extend({
  template: '#emp-edit',
  data: function () {
    return {emp: findEmp(this.$route.params.emp_id)};
  },
  methods: {
    updateEmp: function () {
      empService.update(this.emp.id, this.emp, r => router.push('/'))
    }
  }
});

var EmpDelete = Vue.extend({
  template: '#emp-delete',
  data: function () {
    return {emp: findEmp(this.$route.params.emp_id)};
  },
  methods: {
    deleteEmp: function () {
      empService.deleteEmp(this.emp.id, r => router.push('/'))
//      empService.deleteEmp(this.emp.id, r )
    }
  }
});

var AddEmp = Vue.extend({
  template: '#add-emp',
  data() {
    return {
      emp: {name: '', information: '', empNumber: 0}
    }
  },
  methods: {
    createEmp() {
      empService.create(this.emp, r => router.push('/'))
    }
  }
});

var router = new VueRouter({
	routes: [
		{path: '/', component: List},
		{path: '/emp/:emp_id', component: Emp, name: 'emp'},
		{path: '/add-emp', component: AddEmp},
		{path: '/emp/:emp_id/edit', component: EmpEdit, name: 'emp-edit'},
		{path: '/emp/:emp_id/delete', component: EmpDelete, name: 'emp-delete'}
	]
});

new Vue({
  router
}).$mount('#app')
