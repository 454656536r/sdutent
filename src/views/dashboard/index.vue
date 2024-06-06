<template>
  <div class="dashboard-container">
    <div class="box">
      <button class="add" @click="showDialog">添加</button>
      <input class="souinput" type="text" v-model="searchinp">
      <button class="search" @click="searchbut">搜索</button>
    </div>
    <select class="add" v-model="selectedItem" @change="teacherlist">
      <option value="" disabled selected>请选择老师</option>
      <option v-for="item in dynamicArray" :value="item">{{ item.webname }}</option>
    </select>
    <el-table :data="tableData" style="width: 100%;border-top:1px solid gray;">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" :formatter="formatGender" label="性别"></el-table-column>
      <el-table-column prop="idcards" label="身份证"></el-table-column>
      <el-table-column prop="xueli" label="学历"></el-table-column>
      <el-table-column prop="iphone" label="手机号"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="mark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleView(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="totalItems" :page-size="pageSize"
      :current-page="currentPage" @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 添加 -->
    <el-dialog :visible.sync="dialogVisible" title="添加学生" width="30%">
      <div class="form-row">
        <label>姓名：</label>
        <input type="text" v-model="names">
      </div>
      <div class="form-row">
        <label>年龄：</label>
        <input type="text" v-model="ages">
      </div>
      <div class="form-row">
        <label>性别：</label>
        <input type="radio" name="sex" value="0" v-model="sex"> 男
        <input type="radio" name="sex" value="1" v-model="sex"> 女
      </div>

      <div class="form-row">
        <label>身份证：</label>
        <input type="text" v-model="idcardss">
      </div>
      <div class="form-row">
        <label>学历：</label>
        <input type="text" v-model="xuelis">
      </div>
      <div class="form-row">
        <label>手机号：</label>
        <input type="text" v-model="iphones">
      </div>
      <div class="form-row">
        <label>地址：</label>
        <input type="text" v-model="addresss">
      </div>
      <div class="form-row">
        <label>备注：</label>
        <input type="text" v-model="marks">
      </div>
      <div class="form-row">
        <label>老师：</label>
        <select v-model="selectedItem" @change="printSelectedValue">
          <option v-for="item in dynamicArray" :value="item">{{ item.webname }}</option>
        </select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog :visible.sync="details" title="学生详情" width="90%">
      <el-table :data="[detailData]" style="width: 100%;">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{ detailData.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="年龄">
          <template slot-scope="scope">
            <span>{{ detailData.age }}</span>
          </template>
        </el-table-column>

        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{ detailData.sex === 0 ? '男' : '女' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="身份证">
          <template slot-scope="scope">
            <span>{{ detailData.idcards }}</span>
          </template>
        </el-table-column>

        <el-table-column label="学历">
          <template slot-scope="scope">
            <span>{{ detailData.xueli }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号">
          <template slot-scope="scope">
            <span>{{ detailData.iphone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="地址">
          <template slot-scope="scope">
            <span>{{ detailData.address }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注">
          <template slot-scope="scope">
            <span>{{ detailData.mark }}</span>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handledetails">确定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog :visible.sync="dialogedit" title="编辑学生" width="30%">
      <div class="form-row">
        <label>姓名：</label>
        <input type="text" v-model="name">
      </div>
      <div class="form-row">
        <label>年龄：</label>
        <input type="text" v-model="age">
      </div>
      <div class="form-row">
        <label>性别：</label>
        <input type="radio" name="sex" value="0" v-model="sex"> 男
        <input type="radio" name="sex" value="1" v-model="sex"> 女
      </div>
      <div class="form-row">
        <label>身份证：</label>
        <input type="text" v-model="idcards">
      </div>
      <div class="form-row">
        <label>学历：</label>
        <input type="text" v-model="xueli">
      </div>
      <div class="form-row">
        <label>手机号：</label>
        <input type="text" v-model="iphone">
      </div>
      <div class="form-row">
        <label>地址：</label>
        <input type="text" v-model="address">
      </div>
      <div class="form-row">
        <label>备注：</label>
        <input type="text" v-model="mark">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogedit = false">取 消</el-button>
        <el-button type="primary" @click="handledetaedit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import apisweith from '../sweith'
export default {
  data() {
    return {
      totalItems: 100, // 总条数
      pageSize: 10, // 每页显示条数
      currentPage: 1, // 当前页码

      dynamicArray: [],
      selectedItem: '',

      tableData: [],
      dialogVisible: false,
      details: false,
      dialogedit: false,
      detailData: [],
      name: '',
      age: '',
      sex: '',
      idcards: '',
      xueli: '',
      iphone: '',
      address: '',
      mark: '',
      webname: '',

      names: '',
      ages: '',
      sexs: '',
      idcardss: '',
      xuelis: '',
      iphones: '',
      addresss: '',
      marks: '',
      id: '',

      webidzu: '',
      webnamezu: '',


      searchinp: ''
    };
  },
  mounted() {
    this.getAll()
    this.teacher()
  },
  methods: {
    // 分页
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      const currentPage = this.currentPage
      console.log(currentPage);
      this.getAll()
    },
    // 搜索
    searchbut() {
      let searchlist = this.searchinp
      console.log("搜索值", searchlist);
      const storedToken = localStorage.getItem('webid');
      apisweith.search(storedToken, searchlist)
        .then(res => {
          console.log("搜索", res.data.data.data);
          this.tableData = res.data.data.data
        })
    },
    // 老师
    teacher() {
      const storedToken = localStorage.getItem('webid');
      apisweith.teacher(storedToken)
        .then(res => {
          console.log("老师", res.data.data.data);
          this.dynamicArray = res.data.data.data
        })
    },
    // 获取老师
    printSelectedValue() {
      this.selectedValue = this.selectedItemt;
      this.webidzu = this.selectedValue.webid
      this.webnamezu = this.selectedValue.webname
      console.log(this.webidzu);
      console.log(this.webnamezu);
    },
    // 获取单个老师学生
    teacherlist() {
      this.selectedValue = this.selectedItem;
      console.log("webid",this.selectedValue.webid);
      this.webidzu = this.selectedValue.webid
      let id = this.webidzu
      console.log("IDDD",id);
      apisweith.teacherlist(id)
        .then(res => {
          console.log("单个", res.data.data.data);
          this.tableData = res.data.data.data
        })
    },
    // 数据获取
    getAll() {
      const storedToken = localStorage.getItem('webid');
      console.log(storedToken);
      const currentPage = this.currentPage
      apisweith.getAllStudentList(storedToken, currentPage)
        .then(res => {
          console.log("数据", res.data.data.data);
          this.tableData = res.data.data.data
        })
    },
    // 判断男女
    formatGender(row, column, cellValue) {
      return cellValue === 0 ? '男' : '女';
    },
    // 详情
    handleView(row) {
      // 处理查看操作
      console.log("查看", row.name);
      this.details = true
      this.detailData = row
      console.log("详情", this.detailData);
    },
    // 编辑回显
    handleEdit(row) {
      console.log("编辑", row);
      this.dialogedit = true
      console.log(row);
      this.name = row.name
      this.age = row.age
      this.sex = row.sex
      this.idcards = row.idcards
      this.xueli = row.xueli
      this.iphone = row.iphone
      this.address = row.address
      this.mark = row.mark
      this.id = row.id
    },
    // 删除
    handleDelete(row) {
      // 弹出确认弹窗
      if (confirm("确定要删除吗？")) {
        console.log("删除", row.id);
        apisweith.deleteWxUser(row.id)
          .then(res => {
            console.log("删除成功", res);
            this.getAll();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }).catch(err => {
            console.error("删除失败", err);
          });
      }
    },
    // 添加弹窗
    showDialog() {
      this.dialogVisible = true;
    },
    // 确认添加
    handleAdd() {
      this.dialogVisible = false;
      if (this.names === '' && this.ages === '' && this.sexs === '' && this.idcardss === '' && this.xuelis === '' && this.iphones === '' && this.address === '') {
        this.$message({
          message: '请填写完整信息',
          type: 'error'
        });
      } else {
        apisweith.addevent({
          name: this.names,
          age: this.ages,
          sex: this.sexs,
          idcards: this.idcardss,
          xueli: this.xuelis,
          iphone: this.iphones,
          address: this.addresss,
          mark: this.marks,
          webid: this.webidzu,
          webname: this.webnamezu
        })
          .then(res => {
            console.log(res);
            this.getAll();
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.names = '';
            this.ages = '';
            this.sexs = '';
            this.idcardss = '';
            this.xuelis = '';
            this.iphones = '';
            this.addresss = '';
            this.marks = '';
          })
      }
  },
  // 详情确认
  handledetails() {
    this.details = false
  },
  // 编辑确定
  handledetaedit() {
    this.dialogedit = false
    console.log(this.id);
    apisweith.editor({
      id: this.id,
      name: this.name,
      age: this.age,
      sex: this.sex,
      idcards: this.idcards,
      xueli: this.xueli,
      iphone: this.iphone,
      address: this.address,
      mark: this.mark,
    })
      .then(res => {
        console.log(res);
        this.getAll();
        this.$message({
          message: '编辑成功',
          type: 'success'
        });
      })
  },
}
};
</script>


<style lang="scss" scoped>
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-row label {
  margin-right: 5px;
  /* 调整标签和输入框之间的间距 */
  width: 80px;
}

.form-row input {
  flex: 1;
  /* 输入框占据剩余空间 */
}

.search {
  width: 50px;
  height: 25px;
  float: left;
  margin: 22px 22px 22px 5px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 13px;
  background-color: rgb(0, 110, 255);
}

.souinput {
  width: 150px;
  float: left;
  margin: 22px;
}

.add {
  width: 90px;
  height: 30px;
  background-color: rgb(0, 110, 255);
  color: white;
  border: none;
  font-size: 13px;
  float: left;
  margin: 20px;
  border-radius: 5px;
}

.box {
  width: 100%;
  background-color: antiquewhite;
}
</style>
