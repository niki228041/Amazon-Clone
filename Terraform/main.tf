terraform {
  required_version = ">=0.12"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>2.0"
    }
  }
}
provider "azurerm" {
  features {}
  
}
resource "azurerm_resource_group" "Amazon_Clone" {
  name="AmazonClone"
  location = "Sweden Central"
  
}
resource "azurerm_virtual_network" "Amazon_Clone" {
  name = "AmazonClonevpn"
  address_space = ["10.0.0.0/16"]
  location = azurerm_resource_group.Amazon_Clone.location
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
}

resource "azurerm_subnet" "Amazon_Clone" {
  name = "AmazonClonesub"
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
  virtual_network_name = azurerm_virtual_network.Amazon_Clone.name
  address_prefixes = ["10.0.2.0/24"]
  
}
resource "azurerm_network_interface" "Amazon_Clone" {
  name = "AmazonCloneNic"
  location = azurerm_resource_group.Amazon_Clone.location
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
  ip_configuration {
    name                          = "AmazonCloneConfig1"
    subnet_id                     = azurerm_subnet.Amazon_Clone.id
    private_ip_address_allocation = "Dynamic"
  }
  
  # Create (and display) an SSH key
resource "tls_private_key" "secureadmin_ssh" {
  algorithm = "RSA"
  rsa_bits  = 4096
}
}
resource "azurerm_linux_virtual_machine" "Amazon_Clone" {
  name  = "AmazonCloneVM1"
  location = azurerm_resource_group.Amazon_Clone.location
  resource_group_name = azurerm_resource_group.Amazon_Clone.name
  network_interface_ids = [ azurerm_network_interface.Amazon_Clone.id ]
  vm_size = "Standard_B2ms"
   storage_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
  storage_os_disk {
    name              = "AmazonCloneOSDisk1"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
    disk_size_gb = 30
  }
  
    computer_name  = "AmazonCloneUser"
    admin_username = "azureuser"
    disable_password_authentication = true
    admin_ssh_key {
      username = "azureuser"
      public_key = tls_private_key.secureadmin_ssh.public_key_openssh
    }
 
  
}