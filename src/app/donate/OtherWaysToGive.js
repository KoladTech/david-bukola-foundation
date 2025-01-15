"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gift, Phone, ArrowRight, Package, Coffee, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function OtherWaysToGive() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className="p-3 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Other Ways to Give</h3>

      <div className="space-y-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-8 justify-between hover:bg-blue-50 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 group-hover:bg-blue-200">
                  <Gift className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Material Donations</div>
                  <div className="text-sm text-gray-500">
                    Clothes, food, supplies, others
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Contact Us for Material Donations</DialogTitle>
              <DialogDescription>
                We appreciate your interest in donating materials. Please
                contact us to coordinate your donation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              {/* Mail Section */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Send us a mail</div>
                  <a
                    href="mailto:davidbukolafoundation@gmail.com"
                    className="text-sm text-gray-600"
                  >
                    davidbukolafoundation@gmail.com
                  </a>
                </div>
              </div>
              {/* Phone Number/Whatsapp section */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Call or WhatsApp</div>
                  <div className="text-sm text-gray-600">+234 706 528 6910</div>
                </div>
              </div>
              {/* Call and Whatsapp buttons */}
              <div className="grid grid-cols-2 gap-8">
                {/* Call Button */}
                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = "tel:+234 706 528 6910")
                  }
                >
                  Call Now
                </Button>
                {/* Whatsapp Button */}
                <Button
                  onClick={() =>
                    (window.location.href = "https://wa.me/2347065286910")
                  }
                >
                  WhatsApp
                </Button>
              </div>
              {/* Bottom text */}
              <div className="text-sm text-gray-500 pt-2">
                Available Monday to Friday, 9am - 5pm WAT
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Descriptive cards */}
        <div className="grid grid-cols-3 gap-1">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <Package className="h-6 w-6 text-blue-600 mb-2" />
            <div className="text-sm font-medium">Clothes</div>
            <div className="text-xs text-gray-500">Gently used or new</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <Coffee className="h-6 w-6 text-blue-600 mb-2" />
            <div className="text-sm font-medium">Food & Supplies</div>
            <div className="text-xs text-gray-500">Non-perishable items</div>
          </Card>

          <div className="flex justify-center w-full">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-blue-100">
              <Gift className="h-6 w-6 text-blue-600 mb-2" />
              <div className="text-sm font-medium">Other Items</div>
              <div className="text-xs text-gray-500">Books, toys, etc.</div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
}
