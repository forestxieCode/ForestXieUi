<template>
  <x-table-render :columns="columns" :data="data"></x-table-render>
</template>
<script>
import xTableRender from '../components/table-render/tabel'
export default {
  components: { xTableRender },
  data () {
    return {
      editName: '',
      editAge: '',
      editBirthday: '',
      editAddresss: '',
      editIndex: -1,
      columns: [{
        title: '姓名',
        key: 'name',
        render: (h, {row, index}) => {
          // eslint-disable-next-line no-unused-vars
          let edit
          if (this.editIndex === index) {
            edit = [
              h('input', {
                domProps: {
                  value: row.name
                },
                on: {
                  input: (event) => {
                    this.editName = event.target.value
                  }
                }
              }
              )
            ]
          } else {
            edit = row.name
          }
          return h('div', edit)
        }
      },
      {
        title: '年龄',
        key: 'age',
        render: (h, {row, index}) => {
          // eslint-disable-next-line no-unused-vars
          let edit
          if (this.editIndex === index) {
            edit = [
              h('input', {
                domProps: {
                  value: row.age
                },
                on: {
                  input: (event) => {
                    this.editAge = event.target.value
                  }
                }
              }
              )
            ]
          } else {
            edit = row.age
          }
          return h('div', edit)
        }
      },
      {
        title: '出生日期',
        key: 'birthday',
        // eslint-disable-next-line standard/object-curly-even-spacing
        render: (h, {row, column, index }) => {
          let edit
          if (this.editIndex === index) {
            edit = [
              h('input', {
                domProps: {
                  value: row.birthday
                },
                on: {
                  input: (event) => {
                    this.editBirthday = event.target.value
                  }
                }
              }
              )
            ]
          } else {
            const date = new Date(parseInt(row.birthday))
            const year = date.getFullYear()
            const moth = date.getMonth()
            const day = date.getDate()
            edit = `${year}-${moth}-${day}`
          }
          return h('span', edit)
        }
      },
      {
        title: '地址',
        key: 'address',
        render: (h, {row, index}) => {
          // eslint-disable-next-line no-unused-vars
          let edit
          if (this.editIndex === index) {
            edit = [
              h('input', {
                domProps: {
                  value: row.address
                },
                on: {
                  input: (event) => {
                    this.editAddresss = event.target.value
                  }
                }
              }
              )
            ]
          } else {
            edit = row.address
          }
          return h('div', edit)
        }
      },
      {
        title: '操作',
        render: (h, {row, index}) => {
          if (this.editIndex === index) {
            return [h('button', {
              on: {
                click: () => {
                  this.data[index].name = this.editName
                  this.data[index].age = this.editAge
                  this.data[index].birthday = this.editBirthday
                  this.data[index].address = this.editAddresss
                  this.editIndex = -1
                }
              }
            }, '保存'),
            h('button', {
              style: {
                marginLeft: '6px'
              },
              on: {
                click: () => {
                  this.editIndex = -1
                }
              }
            }, '取消')]
          } else {
            return h('button', {
              on: {
                click: () => {
                  this.editName = row.name
                  this.editAge = row.age
                  this.editAddresss = row.address
                  this.editBirthday = row.birthday
                  this.editIndex = index
                }
              }
            }, '修改')
          }
        }
      }],
      data: [
        {
          name: '小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市'
        },
        {
          name: '小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海定区'
        },
        {
          name: '李晓红',
          age: 30,
          birthday: '696096000000',
          address: '上海'
        }
      ]
    }
  }
}
</script>
