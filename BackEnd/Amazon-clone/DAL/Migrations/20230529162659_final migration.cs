using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class finalmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAddresses_tblOrders_Order_Id",
                table: "tblAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_tblCommentImages_tblComments_Image_Id",
                table: "tblCommentImages");

            migrationBuilder.DropForeignKey(
                name: "FK_tblComments_AspNetUsers_User_Id",
                table: "tblComments");

            migrationBuilder.DropForeignKey(
                name: "FK_tblComments_tblProducts_Product_Id",
                table: "tblComments");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOrders_AspNetUsers_User_Id",
                table: "tblOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOrders_tblCompanies_Company_Id",
                table: "tblOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_tblProductImages_tblProducts_Product_Id",
                table: "tblProductImages");

            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblCategories_Category_Id",
                table: "tblProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblCompanies_Company_Id",
                table: "tblProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblOrders_Order_Id",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProducts_Category_Id",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProducts_Company_Id",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProducts_Order_Id",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProductImages_Product_Id",
                table: "tblProductImages");

            migrationBuilder.DropIndex(
                name: "IX_tblOrders_Company_Id",
                table: "tblOrders");

            migrationBuilder.DropIndex(
                name: "IX_tblOrders_User_Id",
                table: "tblOrders");

            migrationBuilder.DropIndex(
                name: "IX_tblComments_Product_Id",
                table: "tblComments");

            migrationBuilder.DropIndex(
                name: "IX_tblComments_User_Id",
                table: "tblComments");

            migrationBuilder.DropIndex(
                name: "IX_tblCommentImages_Image_Id",
                table: "tblCommentImages");

            migrationBuilder.DropIndex(
                name: "IX_tblAddresses_Order_Id",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "Category_Id",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "Company_Id",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "Order_Id",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "Product_Id",
                table: "tblProductImages");

            migrationBuilder.DropColumn(
                name: "Product_Id",
                table: "tblComments");

            migrationBuilder.DropColumn(
                name: "User_Id",
                table: "tblComments");

            migrationBuilder.DropColumn(
                name: "Order_Id",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "Company_Id",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Image_Id",
                table: "tblCommentImages",
                newName: "Image");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "tblProducts",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "tblProducts",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "tblProducts",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "tblProductImages",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "tblOrders",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "tblOrders",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "tblComments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "tblComments",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CommentId",
                table: "tblCommentImages",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "tblAddresses",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_tblProducts_CategoryId",
                table: "tblProducts",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tblProducts_CompanyId",
                table: "tblProducts",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_tblProducts_OrderId",
                table: "tblProducts",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_tblProductImages_ProductId",
                table: "tblProductImages",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_tblOrders_CompanyId",
                table: "tblOrders",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_tblOrders_UserId",
                table: "tblOrders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_tblComments_ProductId",
                table: "tblComments",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_tblComments_UserId",
                table: "tblComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_tblCommentImages_CommentId",
                table: "tblCommentImages",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_tblAddresses_OrderId",
                table: "tblAddresses",
                column: "OrderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_tblAddresses_tblOrders_OrderId",
                table: "tblAddresses",
                column: "OrderId",
                principalTable: "tblOrders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCommentImages_tblComments_CommentId",
                table: "tblCommentImages",
                column: "CommentId",
                principalTable: "tblComments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblComments_AspNetUsers_UserId",
                table: "tblComments",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblComments_tblProducts_ProductId",
                table: "tblComments",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrders_AspNetUsers_UserId",
                table: "tblOrders",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrders_tblCompanies_CompanyId",
                table: "tblOrders",
                column: "CompanyId",
                principalTable: "tblCompanies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProductImages_tblProducts_ProductId",
                table: "tblProductImages",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblCategories_CategoryId",
                table: "tblProducts",
                column: "CategoryId",
                principalTable: "tblCategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblCompanies_CompanyId",
                table: "tblProducts",
                column: "CompanyId",
                principalTable: "tblCompanies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblOrders_OrderId",
                table: "tblProducts",
                column: "OrderId",
                principalTable: "tblOrders",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAddresses_tblOrders_OrderId",
                table: "tblAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_tblCommentImages_tblComments_CommentId",
                table: "tblCommentImages");

            migrationBuilder.DropForeignKey(
                name: "FK_tblComments_AspNetUsers_UserId",
                table: "tblComments");

            migrationBuilder.DropForeignKey(
                name: "FK_tblComments_tblProducts_ProductId",
                table: "tblComments");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOrders_AspNetUsers_UserId",
                table: "tblOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOrders_tblCompanies_CompanyId",
                table: "tblOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_tblProductImages_tblProducts_ProductId",
                table: "tblProductImages");

            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblCategories_CategoryId",
                table: "tblProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblCompanies_CompanyId",
                table: "tblProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblOrders_OrderId",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProducts_CategoryId",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProducts_CompanyId",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProducts_OrderId",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProductImages_ProductId",
                table: "tblProductImages");

            migrationBuilder.DropIndex(
                name: "IX_tblOrders_CompanyId",
                table: "tblOrders");

            migrationBuilder.DropIndex(
                name: "IX_tblOrders_UserId",
                table: "tblOrders");

            migrationBuilder.DropIndex(
                name: "IX_tblComments_ProductId",
                table: "tblComments");

            migrationBuilder.DropIndex(
                name: "IX_tblComments_UserId",
                table: "tblComments");

            migrationBuilder.DropIndex(
                name: "IX_tblCommentImages_CommentId",
                table: "tblCommentImages");

            migrationBuilder.DropIndex(
                name: "IX_tblAddresses_OrderId",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "tblProductImages");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "tblOrders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "tblOrders");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "tblComments");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "tblComments");

            migrationBuilder.DropColumn(
                name: "CommentId",
                table: "tblCommentImages");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "tblAddresses");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "tblCommentImages",
                newName: "Image_Id");

            migrationBuilder.AddColumn<int>(
                name: "Category_Id",
                table: "tblProducts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Company_Id",
                table: "tblProducts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Order_Id",
                table: "tblProducts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Product_Id",
                table: "tblProductImages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Product_Id",
                table: "tblComments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "User_Id",
                table: "tblComments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Order_Id",
                table: "tblAddresses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Company_Id",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_tblProducts_Category_Id",
                table: "tblProducts",
                column: "Category_Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblProducts_Company_Id",
                table: "tblProducts",
                column: "Company_Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblProducts_Order_Id",
                table: "tblProducts",
                column: "Order_Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblProductImages_Product_Id",
                table: "tblProductImages",
                column: "Product_Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblOrders_Company_Id",
                table: "tblOrders",
                column: "Company_Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblOrders_User_Id",
                table: "tblOrders",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblComments_Product_Id",
                table: "tblComments",
                column: "Product_Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblComments_User_Id",
                table: "tblComments",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblCommentImages_Image_Id",
                table: "tblCommentImages",
                column: "Image_Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblAddresses_Order_Id",
                table: "tblAddresses",
                column: "Order_Id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_tblAddresses_tblOrders_Order_Id",
                table: "tblAddresses",
                column: "Order_Id",
                principalTable: "tblOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tblCommentImages_tblComments_Image_Id",
                table: "tblCommentImages",
                column: "Image_Id",
                principalTable: "tblComments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tblComments_AspNetUsers_User_Id",
                table: "tblComments",
                column: "User_Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tblComments_tblProducts_Product_Id",
                table: "tblComments",
                column: "Product_Id",
                principalTable: "tblProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrders_AspNetUsers_User_Id",
                table: "tblOrders",
                column: "User_Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrders_tblCompanies_Company_Id",
                table: "tblOrders",
                column: "Company_Id",
                principalTable: "tblCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tblProductImages_tblProducts_Product_Id",
                table: "tblProductImages",
                column: "Product_Id",
                principalTable: "tblProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblCategories_Category_Id",
                table: "tblProducts",
                column: "Category_Id",
                principalTable: "tblCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblCompanies_Company_Id",
                table: "tblProducts",
                column: "Company_Id",
                principalTable: "tblCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblOrders_Order_Id",
                table: "tblProducts",
                column: "Order_Id",
                principalTable: "tblOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
