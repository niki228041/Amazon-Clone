provider "aws"{
    region = "eu-north-1"
    access_key=var.aws_access_key
    secret_key=var.aws_secret_key
}
resource "aws_instance" "Jenkins"{
    ami = "ami-0989fb15ce71ba39e"
    instance_type = "t3.micro"
    key_name = "EC2 Tutorial"
    tags = {
      "Name" = "Jenkins Server"
    }
    user_data = "${file("install.sh")}"
    vpc_security_group_ids = [aws_security_group.TFDefault.id]
    ebs_block_device {
      device_name = "/dev/sda1"
      volume_type ="gp3"
      volume_size = 20
      encrypted = true
      delete_on_termination = true

    }
}
resource "aws_security_group" "TFDefault" {
  name = "TFDefault"
  description = "Allow 22, 8080, 80, 3389, 10500 "

  ingress {
      description = "Allow 22"
      from_port = 22
      to_port = 22
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
      description = "Allow 8080"
      from_port = 8080
      to_port = 8080
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
      description = "Allow 80"
      from_port = 80
      to_port = 80
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
      from_port = 0
      to_port = 0
      protocol = "-1"
      cidr_blocks = ["0.0.0.0/0"]
  }
}